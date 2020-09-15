import React, { Component } from 'react'
import Background from '../img/bg.jpg';
import iPhone from '../img/iphone.png';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faMousePointer, faPhone } from "@fortawesome/free-solid-svg-icons"
// import styles from './home.module.css';
import style from './home.module.css';

class Home extends Component {
    render() {
        console.log(iPhone)
        return (
            <div className="" style={{ position: '', width: '100%' }}>
                <div style={{
                    height: '100vh',
                    width: '100%'
                    // minHeight: '900px',
                }}>
                    <div className={style.main} style={{ backgroundImage: `url(${Background})`, }}>
                        <div className="container h-100" style={{ paddingBottom: '150px' }}>
                            <div className="row h-100 align-items-center">
                                <div className="col-12" style={{ color: 'white', paddingTop: '100px', paddingLeft: '50px' }}>
                                    <h1 className="font-weight-light">Hello freak bitches!</h1>
                                    <h1 className="font-weight-light">Little Cost - What A Chance!</h1>
                                    <p className="lead">Now you have an option to get expensive tech for just more than free</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ backgroundColor: '#E0D8DE', height: '26em' }}>
                    <div className="row h-100">
                        <div className="col-4 h-100">
                            <img src={iPhone} style={{ height: '130%', left: '70px', top: '-170px', position: 'relative' }}></img>
                        </div>
                        <div className="col-8 my-auto">
                            <div className="row">
                                <div className="col-3">
                                    <Card className="h-100" style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center' }}>
                                                <FontAwesomeIcon className="w-100" icon={faSearch} style={{marginBottom: 15}} size="lg" />
                                                Search
                                            </Card.Title>
                                            <Card.Text className="text-center" style={{ textAlign: 'center' }}>
                                                Search for the item you want to get
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-3" >
                                    <Card className="h-100 text-center" style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center' }}>
                                                <FontAwesomeIcon className="w-100" style={{marginBottom: 15}} icon={faMousePointer} size="lg" />
                                                Participate
                                            </Card.Title>
                                            <Card.Text style={{ textAlign: 'center' }}>
                                                Participate in a giveaway
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-3">
                                    <Card className="h-100 text-center" style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center' }}>
                                                <FontAwesomeIcon className="w-100" style={{marginBottom: 15}} icon={faPhone} size="lg" />
                                                Win
                                            </Card.Title>
                                            <Card.Text style={{ textAlign: 'center' }}>
                                                As soon as there are enough people, the winner is randomly selected
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
