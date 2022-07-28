import './ProblemListPage.css';
import { ProblemCard } from '../../Components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ProblemListPage = () => {
    const [dataArray, setDataArray] = useState([]);

    const url = process.env.REACT_APP_API_URL;

    //html element reference
    const pre_ref = useRef(null);
    const body_ref = useRef(null);


    //loading screen function
    useEffect(() => {
        setTimeout(() => {
            pre_ref.current.style = "display: none";
            body_ref.current.style = "display: block";
        }, 6000);
    }, []);

    function seeAllProblems() {
        //get data from database
        axios.get(url)
            .then(res => {
                let dataMatrix = [];
                while (res.data.length) {
                    dataMatrix.push(res.data.splice(0, 5));
                }

                setDataArray(dataMatrix);
            }).catch(err => console.log(err));
    }

    window.addEventListener('load', e => {
        e.preventDefault();
        seeAllProblems();
    })

    return (
        <>
            <div className='problem-preload' ref={pre_ref}><img className='problem-preload-img' alt=''></img></div>
            <div className='problems-body' ref={body_ref} style={{ display: "none" }}>
                <div className='problems-navibar'>
                    <a className='to-home' href='/'>
                        <div className='label'>Home</div>
                    </a>
                </div>
                {dataArray.map((dataSubArray, idx) => (
                    <div className='problem-container' key={idx}>
                        {dataSubArray.map((data, idx) => (
                            <ProblemCard img={data.img_src} ans={data.answer} id={data._id} key={idx} />
                        ))}
                    </div>
                ))}

            </div>
        </>
    );
}

export default ProblemListPage;