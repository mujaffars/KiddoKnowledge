// src/components/Quiz.tsx
'use client';

import React, { useState, useEffect } from 'react';
import './quiz.css';

const getRandomQuestions = (questions, numQuestions) => {
  // const shuffled = questions.sort(() => 0.5 - Math.random());
  const shuffled = questions;
  return shuffled.slice(0, numQuestions);
};

const Quiz = ({ questions, grade }) => {
  const totalQuestions = 10;
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [answers, setAnswers] = useState(new Array(totalQuestions).fill('')); // Array to hold user answers

  const [showAnswer, setShowAnswer] = useState(true); // State to control answer display
  const [totalScore, setTotalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRandomQuestions(getRandomQuestions(questions, totalQuestions));
  }, [questions]);

  const handleAnswer = (index, selectedAnswer) => {
    const correctAnswer = randomQuestions[index].answer;
    const isCorrect = selectedAnswer === correctAnswer;

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = { answer: selectedAnswer, isCorrect }; // Store both answer and correctness info
      return newAnswers;
    });

  };

  const handleSubmit = () => {
    // Check if any question remains unanswered
    const anyUnanswered = answers.some((answer) => answer === '');
    if (anyUnanswered) {
      // Handle case where not all questions are answered
      alert('Please answer all questions before submitting.');
      return;
    }

    console.log(answers)
    let score = 0;
    answers.forEach((answer) => {
      if (answer && answer.isCorrect) {
        score++;
      }
    });
    console.log(score)
    setTotalScore(score);
    setShowAnswer(true); // Show answers after submission
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className={`quiz-container ${showAnswer ? 'show-answers' : ''}`}>
      <h2 className="quiz-title">{grade} Quiz</h2>
      <div className="question-container">
        {randomQuestions.map((question, index) => (
          <div key={index} className={`question ${
            answers[index]
              ? answers[index].isCorrect
                ? 'correct-answer'
                : 'div-wrong-answer'
              : ''
          }`}>
            <p className="question-text">{eval(index + 1) + ") " + question.question}</p>
            <div className="options-container">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
                  <label className={`option-label ${
                    (answers[index] &&
                      !answers[index].isCorrect &&
                      (typeof option === 'string' ? option : option.text) === question.answer)
                      ? 'correct-answer-label'
                      : ''
                  }`}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={typeof option === 'string' ? option : option.text}
                      onChange={() => handleAnswer(index, typeof option === 'string' ? option : option.text)}
                      disabled={answers[index] ? true : false}
                    />
                    <span className={`option-text ${answers[index]?.isCorrect ? 'correct-answer' : answers[index] ? 'wrong-answer' : ''}`}>
                      {typeof option === 'string' ? option : option.text}
                      {typeof option !== 'string' && option.image && <img src={option.image} alt={`Option ${optionIndex + 1}`} className="option-image" />}
                    </span>
                  </label>

                  {/* <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswer(index, option)}
                      disabled={answers[index] ? true : false}
                    />
                    <span className={`option-text ${answers[index]?.isCorrect ? 'correct-answer' : answers[index] ? 'wrong-answer' : ''}`}>
                      {option}
                    </span>
                  </label> */}
                </div>
              ))}
            </div>
            {answers[index] && !answers[index].isCorrect && (
              <p className="answer text-green">
                Correct Answer: {question.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Quiz Results</h2>
            <p>Your score: {totalScore}/{randomQuestions.length}</p>
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}

      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Quiz;
