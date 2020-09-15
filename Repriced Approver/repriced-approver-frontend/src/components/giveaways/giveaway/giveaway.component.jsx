import React from "react";
import {Link} from "react-router-dom";

const Giveaway = (props) => {
    return (
        <tr>
            <td>{props.giveaway.costByParticipant}</td>
            <td>{props.giveaway.expirationDate.substring(0, 10)}</td>
            <td>{props.giveaway.status}</td>
            <td>{props.giveaway.participantsLimit}</td>
            <td>{props.giveaway.createdAt.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.giveaway.id}>edit</Link>
            </td>
        </tr>
    );
}

export default Giveaway;