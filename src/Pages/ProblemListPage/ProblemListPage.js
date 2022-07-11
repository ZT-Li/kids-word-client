import './ProblemListPage.css';
import { ProblemCard } from '../../Components';
import { useState } from 'react';
import axios from 'axios';

const ProblemListPage = () => {
    const [dataArray, setDataArray] = useState([]);

    const url = 'http://localhost:5000/api';

    function seeAllProblems() {
        //get data from database
        axios.get(url)
            .then(res => {
                setDataArray(res.data);
            }).catch(err => console.log(err));
    }

    return (
        <>
            <div className='problem-container'>
                <button onClick={seeAllProblems}>see all problems</button>
                {dataArray.map((data, idx) => (
                    <ProblemCard img={data.img_src} ans={data.answer} key={idx} />
                ))}
            </div>
        </>
    );
}

export default ProblemListPage;