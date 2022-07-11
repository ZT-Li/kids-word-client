import "./MainPage.css";
import { useEffect, useRef } from "react";
import axios from "axios";


const MainPage = () => {

    let dataIdx = 0;
    let dataArray = [];
    let checkedImage = false;

    //preload the data from backend
    axios.get(process.env.REACT_APP_API_URL)
        .then(res => {
            dataArray = res.data;
        })
        .catch(err => console.log(err));

    //references of html elements
    const preload_ref = useRef(null);
    const url_ref = useRef(null);
    const ans_ref = useRef(null);
    const input_ref = useRef(null);
    const sample_ref = useRef(null);
    const prompt_ref = useRef(null);
    const checkImage_ref = useRef(null);

    //loading screen function
    useEffect(() => {
        setTimeout(() => {
            preload_ref.current.style = "display: none";
        }, 4500);
    }, []);

    //check btn onclick function
    function checkImage(e) {
        e.preventDefault();
        if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url_ref.current.value)) {
            checkImage_ref.current.src = url_ref.current.value;
            prompt_ref.current.innerHTML = "Url is valid! Add this image? ＜（￣︶￣）＞";
            checkedImage = true;
        } else {
            prompt_ref.current.innerHTML = "This Url is not an image... (^_^;)";
        }
    }

    //add btn onclick function
    function addImage(e) {
        e.preventDefault();
        if (url_ref.current.value.length === 0) prompt_ref.current.innerHTML = "Did you forget to paste the URL? ╮( •́ω•̀ )╭";
        else if (ans_ref.current.value.length === 0) prompt_ref.current.innerHTML = "Did you forget to put the answer? ╮(￣▽￣)╭";
        else if (!checkedImage) prompt_ref.current.innerHTML = "Did you checked the image? （￣.￣）";
        else {
            prompt_ref.current.innerHTML = "Image is added successfully! /(≧ω≦)/";
        }

        //send the img url and answer to the server
        /*
        axios.post('http://localhost:5000/api', {
            img_src: url_ref.current.value,
            answer: ans_ref.current.value
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
            */
    }

    //start quiz
    function startQuiz(e) {
        e.preventDefault();
        sample_ref.current.src = dataArray[0].img_src;
    }

    //check the answer
    function sumbitAnswer(e) {
        e.preventDefault();
        if (dataIdx >= dataArray.length)
            alert("You have passed all quiz");
        else if (dataArray[dataIdx].answer === input_ref.current.value) {
            dataIdx += 1;
            if (dataIdx >= dataArray.length)
                alert("pass all quiz");
            else {
                sample_ref.current.src = dataArray[dataIdx].img_src;
                alert("correct");
            }
        } else {
            alert("wrong");
        }
    }

    return (
        <>
            <div className="preload" ref={preload_ref}><img className="preload-gif" alt="" /></div>
            <div className="navbar">
                <a className="to-quiz" href="#quiz">
                    <div className="label">Start Quiz</div>
                </a>
                <a className="to-problem" href="#problem-creation">
                    <div className="label">Add Problems</div>
                </a>
            </div>

            <div className="quiz" id="quiz">
                <div className="quiz-container">
                    <button className="start-btn" onClick={startQuiz}> {"|> start"}</button>
                    <img className="sample" ref={sample_ref} alt="" />
                    <input className="answer" ref={input_ref} type="text" placeholder="what's the name of the animal?" />
                    <button className="submit-btn" onClick={sumbitAnswer}>{"->"}</button>
                </div>
            </div>

            <div className="problem-creation" id="problem-creation">
                <div className="form-container">
                    <div className="prompt" ref={prompt_ref}></div>
                    <img className="selected-img" ref={checkImage_ref} alt="" />
                    <input className="img-src" ref={url_ref} type="text" placeholder="paste the image url here" />
                    <input className="img-answer" ref={ans_ref} type="text" placeholder="write the answer here" />
                    <button className="check-btn" onClick={checkImage}>check</button>
                    <button className="add-btn" onClick={addImage}>add</button>
                </div>
            </div>
        </>
    );
}

export default MainPage;


