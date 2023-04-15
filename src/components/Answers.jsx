import { useEffect, useState } from "react";

export default function Answer({correctAnswer, incorrectAnswers}){

    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correct, setCorrect]=useState();

    useEffect(() =>{
        let answersCopy = [];
        answersCopy.push(correctAnswer);
        for(let i=0; i< incorrectAnswers.length; i++){
            answersCopy.push(incorrectAnswers[i]);
        }
        // console.log(answersCopy);
        setAnswers(answersCopy.sort(() => 0.5 - Math.random()));
    },[])

    const handleSelect = (answer) =>{
        if(!selectedAnswer){
            if(answer === correctAnswer){
                setCorrect(true);
                console.log("ACERTASTE");
            } else {
                setCorrect(false);
                console.log("Fallaste");
            }
            setSelectedAnswer(answer);
        }
    }
    return( 
        <ul className="answers">
            {answers && answers.map((answer,index) =>
                <p className={answer === correctAnswer && selectedAnswer!==null ? "correct" :
                                selectedAnswer !== correctAnswer && selectedAnswer!==null ? "incorrect" : "" }
                    key={index} onClick={() => handleSelect(answer)}>  {answer}
                </p>
             )}
        </ul>
    );
}