import './ProblemCard.css';
import axios from 'axios';
import { useState, useRef } from 'react';

const ProblemCard = (props) => {
    const [exist, SetExist] = useState(true);
    const [edit, SetEdit] = useState(false);

    const input_ref = useRef(null);

    //delete the card from database and removed the data
    function deleteCard(e) {
        e.preventDefault();
        axios.delete(process.env.REACT_APP_API_URL + '/' + props.id)
            .then(SetExist(false))
            .catch(err => console.log(err));
    }

    //edit the card and the data
    function editCard(e) {
        e.preventDefault();
        input_ref.current.disabled = false;
        input_ref.current.style.background = "white";
        SetEdit(true);
    }

    //submit the change of the card
    function submitChange(e) {
        e.preventDefault();
        input_ref.current.disabled = true;
        input_ref.current.style.background = "transparent";

        //update the change on database
        axios.patch(process.env.REACT_APP_API_URL + '/' + props.id, { answer: input_ref.current.value })
            .then(alert("update completed"))
            .catch(err => console.log(err));

        SetEdit(false)
    }

    if (exist) {
        return (
            <div className='card'>
                <img className='p-img' src={props.img} alt="" />
                <input className='p-ans' ref={input_ref} type='text' defaultValue={props.ans} disabled></input>
                {edit ?
                    <button className='edit-btn' onClick={submitChange}>submit</button> :
                    <button className='edit-btn' onClick={editCard}>edit</button>
                }
                <button className='remove-btn' onClick={deleteCard}>delete</button>
            </div>
        );
    } else {
        return null;
    }
}

export default ProblemCard;