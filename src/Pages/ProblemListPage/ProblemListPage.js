import './ProblemListPage.css';
import { ProblemCard } from '../../Components';
import { useState } from 'react';
import axios from 'axios';

const ProblemListPage = () => {
    const [dataArray, setDataArray] = useState([]);

    const url = process.env.REACT_APP_API_URL;

    function seeAllProblems() {
        //get data from database
        axios.get(url)
            .then(res => {
                setDataArray(res.data);
            }).catch(err => console.log(err));
    }

    window.addEventListener('load', e => {
        seeAllProblems();
    })

    return (
        <>
            <div className='problem-container'>
                {dataArray.map((data, idx) => (
                    <ProblemCard img={data.img_src} ans={data.answer} id={data._id} key={idx} />
                ))}
            </div>
        </>
    );
}

export default ProblemListPage;