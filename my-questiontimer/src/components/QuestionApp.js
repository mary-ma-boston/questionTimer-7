import React, {useState}from 'react';

import classes from './QuestionApp.module.css';

var countdownResource = -1;

const QuestionApp = () => {
    const [isSet, setIsSet] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isAlertColor, setIsAlertColor] = useState(false);

    const questions =[
        'What is your favorite color?',
        'What is your favorite animal?',
        'What is your favorite food?',
    ];

    const handleNextQuestion = () => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setIsSet(false);
        setTimer(60);

        if (countdownResource !== -1)
        {
            clearInterval(countdownResource);
            countdownResource = -1;
            setIsAlertColor(false);
        }
    };

    const handleStartQuestion = () => {
        if (countdownResource !== -1)
        {
            clearInterval(countdownResource)
            countdownResource = -1;
        }

        countdownResource = setInterval(() => {
            setTimer((prevTimer) => {
                let tmpVal = prevTimer - 1;
                if (tmpVal <= 0) {
                    clearInterval(countdownResource);
                    countdownResource = -1;
                    setIsAlertColor(false);
                }
        
                if( tmpVal === 20 ) {
                    setIsAlertColor(true);
                }

                return tmpVal;
            });
        }, 1000);
        
        setIsSet(true);
        setTimer(60);   
        setIsAlertColor(false);
    };

    return (
        <div className={classes['question-app']}>
            <h1>Question App</h1>
            {questionIndex < questions.length ? (
                <div className={classes['question-container']}>
                    <h2>Question {questionIndex + 1}</h2>
                    <h1>{questions[questionIndex]}</h1>
                    <p className={`classes.timer ${isAlertColor? classes['alert-color']:''}`}>Time Remaining: {timer}</p>
                    <button className={classes['start-button']} onClick={handleStartQuestion}>
                        Set Question
                    </button>
                    <button className={classes['next-button']} onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </div>
            ) : (
                <h2>No more questions</h2>
            )}
        </div>
    );
};

export default QuestionApp;