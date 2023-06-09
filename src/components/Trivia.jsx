import axios from "axios";
import { useState } from "react";
import Answers from "./Answers";
import "./Trivia.scss";

export default function Trivia () {

    const [questions, setQuestions] = useState();
    const [amount, setAmount] = useState(0);
    const [difficulty, setDifficulty] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuestions(null);
        axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`).then(res => {
            setQuestions(res.data.results);
        })
    }
    return (
        <div className="trivia">
            <div className="trivia__info">
                <form onSubmit={handleSubmit}>
                    <label><span>Insert number of Questions: </span>  
                        <input type="number" onChange={(e) => setAmount(e.target.value)}/>
                    </label>
                    <label>
                        <span>Select Difficulty: </span> 
                        <select onChange={(e) => setDifficulty(e.target.value.toLocaleLowerCase())}>
                            <option>Any Difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </label>
                    <button>Generate questions</button>
                </form>
            </div>
            <div className="trivia__questions">
                {questions &&  questions.map((question, index) => 
                   <div class="question" key={index}>
                        <h4>{question.question}</h4>
                        <Answers correctAnswer={question.correct_answer} incorrectAnswers={question.incorrect_answers}/>
                   </div>
                )}
            </div>
        </div>
    );
}