"use client"
import { useState } from "react";
import Modal from "@/Components/Modals/Modal";
import styles from "./quizModal.module.scss";

export const questions = [
  {
    question: "Which series of paintings did Monet first exhibit as a complete series in 1891?",
    responses: [
      "The Poplars",
      "The Haystacks",
      "The Rouen Cathedral",
      "The Water Lilies",
    ],
    answer: 1
  },
  {
    question: "In *Spring (Fruit Trees in Bloom)*, why can't the type of tree represented be determined precisely?",
    responses: [
      "The white flowers are not specific to any species.",
      "Monet chose to use only abstract colors.",
      "The painting is unfinished.",
      "Monet made a mistake in his choice of flower colors.",
    ],
    answer: 0
  }
];

export default function QuizModal({ position, closeModal }) {
  const [finished, setFinished] = useState(false); // Flag indicating if the quiz is finished
  const [currentQuestion, setCurrentQuestion] = useState(0); // Index of the current question
  const [selectedResponse, setSelectedResponse] = useState(null); // Selected response
  const [responses, setResponses] = useState([]); // Array to record responses
  const isLastQuestion = currentQuestion === questions.length - 1; // Checks if it is the last question

  const checkGoodAnswers = () => {
    let goodAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === responses[i]?.selectedResponse) {
        goodAnswers++;
      }
    }
    return goodAnswers;
  };

  const handleNextQuestion = () => {
    setResponses((prev) => {
      const updatedResponses = [...prev];
      updatedResponses[currentQuestion] = { questionIndex: currentQuestion, selectedResponse };
      return updatedResponses;
    });

    if (!isLastQuestion) {
      setSelectedResponse(null);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <Modal closeModal={closeModal} position={[-6.59, 2.37, 1.96]}>
      {
        !finished ? (
          <>
            <div className={`header p-1 ${styles.header}`}>
              <h2>Claude Monet Quiz</h2>
            </div>
            <div className={"content"}>
              <div className={"description"}>{questions[currentQuestion].question}</div>
              <div className={styles.responses}>
                {questions[currentQuestion].responses.map((response, index) => (
                  <div key={index} className={styles.response}>
                    <input
                      type="radio"
                      id={`response-${index}`}
                      name="response"
                      value={index}
                      checked={selectedResponse === index}
                      onChange={() => setSelectedResponse(index)}
                    />
                    <label htmlFor={`response-${index}`}>{response}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${styles.footer} footer f-between`}>
              <div className={styles.progress}>{currentQuestion + 1}/{questions.length}</div>
              <div className={styles.buttons}>
                <button
                  onClick={handleNextQuestion}
                  className={"button"}
                  disabled={selectedResponse === null}
                >
                  {isLastQuestion ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`header p-1 ${styles.header}`}>
              <h2>Claude Monet Quiz</h2>
            </div>
            <div className={"content"}>
              <div className={"description"}>
                <p>Quiz completed! Thank you for participating.</p>
                <p>You got {checkGoodAnswers()} correct answers, well done!!!</p>
              </div>
            </div>
            <div className={`${styles.footer} footer f-between`}>
              <div className={styles.buttons}>
                <button
                  onClick={closeModal}
                  className={"button"}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )
      }
    </Modal>
  );
}
