// src/components/Quiz.tsx
'use client';

import React, { useState } from 'react';
import './quiz.css';

const Quiz = ({ questions, grade }) => {
  const [answers, setAnswers] = useState(new Array(questions.length).fill('')); // Array to hold user answers
  const [showAnswer, setShowAnswer] = useState(false); // State to control answer display
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (index, selectedAnswer) => {
    const correctAnswer = questions[index].answer;
    const isCorrect = selectedAnswer === correctAnswer;

    const newAnswers = [...answers];
    newAnswers[index] = { answer: selectedAnswer, isCorrect }; // Store both answer and correctness info
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    answers.forEach((answer) => {
      if (answer && answer.isCorrect) {
        score++;
      }
    });
    setTotalScore(score);
    setShowAnswer(true); // Show answers after submission
  };

  return (
    <div className={`quiz-container ${showAnswer ? 'show-answers' : ''}`}>
      <h2 className="quiz-title">{grade} Quiz</h2>
      <div className="question-container">
        {questions.map((question, index) => (
          <div key={index} className={`question ${answers[index]?.isCorrect ? 'correct-answer' : ''}`}>
            <p className="question-text">{question.question}</p>
            <div className="options-container">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleAnswer(index, option)}
                    />
                    <span className={`option-text ${answers[index]?.isCorrect ? 'correct-answer' : answers[index] ? 'wrong-answer' : ''}`}>
                      {option}
                    </span>
                  </label>
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
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Quiz;
