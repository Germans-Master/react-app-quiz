import React, { useState } from "react";

function Quiz() {
  const difficultyLevels = {
    beginner: [
      {
        question: "Mannschaft",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        selectedAnswer: null
      },
      {
        question: "Jahr",
        options: ["der", "die", "das"],
        correctAnswer: "das",
        selectedAnswer: null
      },
      {
        question: "Museum",
        options: ["der", "die", "das"],
        correctAnswer: "das",
        selectedAnswer: null
      }
    ],
    advanced: [
      {
        question: "Uhr",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        selectedAnswer: null
      },
      {
        question: "Teilnahme",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        selectedAnswer: null
      },
      {
        question: "Berater",
        options: ["der", "die", "das"],
        correctAnswer: "der",
        selectedAnswer: null
      }
    ],
    expert: [
      {
        question: "Anzahlung",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        selectedAnswer: null
      },
      {
        question: "Akzeptanz",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        selectedAnswer: null
      },
      {
        question: "Klavier",
        options: ["der", "die", "das"],
        correctAnswer: "das",
        selectedAnswer: null
      }
    ]
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleOptionClick = (option) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = option;
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  const handlePlayClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setQuestions(difficultyLevels[difficulty]);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const renderQuiz = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
      <div className="container">
        <h3>{currentQuestion.question}</h3>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={
                currentQuestion.selectedAnswer === option ? "selected" : ""
              }
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  

  const renderResults = () => {
    const totalQuestions = questions.length;
    const correctAnswers = calculateScore();
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
    const handleNewGame = () => {
      setSelectedDifficulty(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setQuizCompleted(false);
    };
  
    const handleAccount = () => {
      // Handle account button click
    };
  
    const handleAbout = () => {
      // Handle about button click
    };
  
    return (
      <div className="container">
        <h3>Quiz Results</h3>
        <div className="result-table">
          <p>
            <span>Total Answers:</span>
            <strong>{totalQuestions}</strong>
          </p>
          <p>
            <span>Correct Answers:</span>
            <strong>{correctAnswers}</strong>
          </p>
          <p>
            <span>Percentage of Correct Answers:</span>
            <strong>{percentage}%</strong>
          </p>
        </div>

        <div className="button-container">
          <button className="red-btn" onClick={handleNewGame}>New Quiz</button>
          <button className="red-btn" onClick={handleAccount}>Account</button>
          <button className="red-btn" onClick={handleAbout}>About</button>
        </div>

      </div>
    );
  };
  

  return (
    <div className="container">
      {!selectedDifficulty && (
        <div>
          <h3>Choose Difficulty Level</h3>
          <button className="small-btn" onClick={() => handlePlayClick("beginner")}>Beginner</button>
          <button className="small-btn" onClick={() => handlePlayClick("advanced")}>Advanced</button>
          <button className="small-btn" onClick={() => handlePlayClick("expert")}>Expert</button>
        </div>
      )}
      {selectedDifficulty && (
        <div>
          {quizCompleted ? renderResults() : renderQuiz()}
        </div>
      )}
    </div>
  );
}

export default Quiz;
