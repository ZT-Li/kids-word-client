import './ProblemCard.css';
import axios from 'axios';
import { useState } from 'react';

const ProblemCard = (props) => {
    const [exist, SetExist] = useState(true);

    //delete the data from database
    function deleteProblem() {
        axios.delete(process.env.REACT_APP_API_URL + props.id)
            .then(SetExist(false))
            .catch(err => console.log(err));
    }

    if (exist) {
        return (
            <div className='card'>
                <img className='p-img' src={props.img} alt="" />
                <div className='p-ans'>{props.ans}</div>
                <button className='edit-btn'>edit</button>
                <button className='remove-btn' onClick={deleteProblem}>delete</button>
            </div>
        );
    } else {
        return null;
    }
}

export default ProblemCard;