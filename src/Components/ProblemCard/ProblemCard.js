import './ProblemCard.css';

const ProblemCard = (props) => {
    return (
        <div className='card'>
            <img className='p-img' src={props.img} alt="" />
            <div className='p-ans'>{props.ans}</div>
            <button className='edit-btn'>/</button>
            <button className='remove-btn'>x</button>
        </div>
    );
}

export default ProblemCard;