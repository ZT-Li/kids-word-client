import "./MainPage.css";
import { useEffect, useRef } from "react";
import axios from "axios";


const MainPage = () => {

    let dataIdx = 0;
    let passAllIdx = 0;
    let dataArray = [];
    let checkedImage = false;

    //constant of dialogs
    const correctAnswer = ["Correct!（￣ˇ￣）", "Keep going <（￣︶￣）>", "Good Job! ＼（￣︶￣）／"];
    const wrongAnswer = ["Try again (*￣∇￣*)", "Almost there ╮（￣▽￣）╭", "Don't give up （｡・`ω´･）"];
    const passAll = ["You have passed all quiz ｂ（￣▽￣）ｄ",
        "Do you want to restart? (* ￣ー￣)",
        "Hit the start button to restart (*￣∇￣*)",
        "Hit the start button to restart... (*￣∇￣*)",
        "Just hit the **** button to restart （╬￣皿￣）"];

    //references of html elements
    const preload_ref = useRef(null);
    const postload_ref = useRef(null);
    const url_ref = useRef(null);
    const ans_ref = useRef(null);
    const input_ref = useRef(null);
    const sample_ref = useRef(null);
    const quizPrompt_ref = useRef(null);
    const prompt_ref = useRef(null);
    const checkImage_ref = useRef(null);

    //loading screen function
    useEffect(() => {
        setTimeout(() => {
            preload_ref.current.style = "display: none";
            postload_ref.current.style = "display: block";
        }, 4500);
    }, []);

    //check btn onclick function
    function checkImage(e) {
        e.preventDefault();
        checkImage_ref.current.src = url_ref.current.value;
        prompt_ref.current.innerHTML = "Add this image? ＜（￣︶￣）＞";
        checkedImage = true;
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
        axios.post(process.env.REACT_APP_API_URL, {
            img_src: url_ref.current.value,
            answer: ans_ref.current.value.toLowerCase()
        })
            .then(() => {
                checkImage_ref.current.src = "";
                url_ref.current.value = "";
                ans_ref.current.value = "";
            })
            .catch(err => console.log(err));

    }

    //start quiz
    function startQuiz(e) {
        e.preventDefault();
        dataIdx = 0;
        passAllIdx = 0;
        quizPrompt_ref.current.innerHTML = "";
        //get the data from database
        axios.get(process.env.REACT_APP_API_URL)
            .then(res => {
                dataArray = res.data;
                //shuffle the array
                dataArray = dataArray.sort((a1, a2) => 0.5 - Math.random());
                if (dataArray.length === 0)
                    alert("please add more problems")
                else
                    sample_ref.current.src = dataArray[0].img_src;
            })
            .catch(err => console.log(err));
    }

    //check the answer
    function sumbitAnswer(e) {
        e.preventDefault();
        if (dataIdx >= dataArray.length) {
            quizPrompt_ref.current.innerHTML = passAll[passAllIdx];
            if (passAllIdx < 4) passAllIdx += 1;
        }
        else if (dataArray[dataIdx].answer === input_ref.current.value.toLowerCase()) {
            dataIdx += 1;
            if (dataIdx >= dataArray.length)
                quizPrompt_ref.current.innerHTML = "pass all quiz!!!";
            else {
                sample_ref.current.src = dataArray[dataIdx].img_src;
                quizPrompt_ref.current.innerHTML = correctAnswer[Math.floor(Math.random() * 3)];
            }
        } else {
            quizPrompt_ref.current.innerHTML = wrongAnswer[Math.floor(Math.random() * 3)];
        }
    }

    return (
        <>
            <div className="preload" ref={preload_ref}><img className="preload-gif" alt="" /></div>
            <div className="postload" ref={postload_ref} style={{ display: "none" }}>
                <div className="navbar">
                    <a className="to-quiz" href="#quiz">
                        <div className="label">Start Quiz</div>
                    </a>
                    <a className="to-problem" href="#problem-creation">
                        <div className="label">Add Problems</div>
                    </a>
                    <a className="to-problem-list" href="/problems">
                        <div className="label">Problem List</div>
                    </a>
                </div>

                <div className="quiz" id="quiz">
                    <div className="quiz-container">
                        <div className="prompt" ref={quizPrompt_ref}></div>
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
            </div>
        </>
    );
}

export default MainPage;


