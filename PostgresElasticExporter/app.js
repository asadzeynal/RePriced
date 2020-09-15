const {Pool} = require('pg');
const async = require('async');
// const Sequelize = require('sequelize');
const {Client} = require('@elastic/elasticsearch');


const pool = new Pool({
    user: 'repriced_admin',
    host: '',
    database: 'repriced',
    password: '',
    port: 5432,
});

const elasticClient = new Client({node: 'http://localhost:9200'});


function doExport() {
    pool.query('SELECT * FROM GIVEAWAYS g INNER JOIN GIVEAWAY_ELASTIC_EXPORTS j ON g.id = j.giveaway_id ')
        .then((res) => {
            async.each(res.rows, async (giveaway) => {
                const prod = await pool.query(`SELECT * FROM PRODUCTS WHERE ID = ${giveaway.product_id}`);
                giveaway.product = prod.rows[0];
                const operation = giveaway.operation;
                giveaway.id = giveaway.giveaway_id;
                delete giveaway.operation;
                delete giveaway.winner_id;
                delete giveaway.giveaway_id;
                const cost = giveaway.cost_by_participant === null ? null :
                    parseFloat(giveaway.cost_by_participant).toFixed(2);
                giveaway.cost_by_participant = cost;
                try {
                    if (operation === 'insert' || operation === 'update') {
                        await elasticClient.index({
                            index: 'giveaways',
                            id: giveaway.id,
                            body: giveaway,
                        });
                        console.log('Inserted Giveaway with ID ' + giveaway.id);
                        await pool.query(`DELETE FROM GIVEAWAY_ELASTIC_EXPORTS WHERE GIVEAWAY_ID = ${giveaway.id}`);
                    } else if (operation === 'delete') {
                        await elasticClient.delete({
                            index: 'giveaways',
                            id: giveaway.id,
                        });
                        console.log('Deleted Giveaway with ID ' + giveaway.id);
                        await pool.query(`DELETE FROM GIVEAWAY_ELASTIC_EXPORTS WHERE GIVEAWAY_ID = ${giveaway.id}`);
                    }
                } catch (error) {
                    console.log(error);
                    console.log(error);
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

setInterval(doExport, 10 * 1000);