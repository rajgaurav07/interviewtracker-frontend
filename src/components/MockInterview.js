import { useState } from "react";

function MockInterview() {

    const questions = [

        {
            question: "What is JVM?",
            answer: "JVM stands for Java Virtual Machine. It executes Java bytecode and provides platform independence."
        },

        {
            question: "Difference between JDK and JRE?",
            answer: "JDK is used for development and contains JRE + development tools. JRE is only used to run Java programs."
        },

        {
            question: "What is Spring Boot?",
            answer: "Spring Boot is a framework that simplifies Spring application development by providing auto-configuration and embedded servers."
        },

        {
            question: "Explain OOP Principles.",
            answer: "Encapsulation, Inheritance, Polymorphism and Abstraction."
        },

        {
            question: "What is SQL JOIN?",
            answer: "JOIN is used to combine rows from multiple tables based on a related column."
        }

    ];

    const [current, setCurrent] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const nextQuestion = () => {

        if (current < questions.length - 1) {

            setCurrent(current + 1);
            setShowAnswer(false);

        }

    };

    const previousQuestion = () => {

        if (current > 0) {

            setCurrent(current - 1);
            setShowAnswer(false);

        }

    };

    return (

        <div className="card shadow mt-4">

            <div className="card-body">

                <h2 className="text-primary">
                    Mock Interview
                </h2>

                <h5 className="mt-3">

                    Question {current + 1} / {questions.length}

                </h5>

                <div className="alert alert-primary mt-3">

                    <strong>

                        {questions[current].question}

                    </strong>

                </div>

                {

                    showAnswer &&

                    <div className="alert alert-success">

                        {questions[current].answer}

                    </div>

                }

                <button
                    className="btn btn-success me-2"
                    onClick={() => setShowAnswer(true)}
                >
                    Show Answer
                </button>

                <button
                    className="btn btn-secondary me-2"
                    onClick={previousQuestion}
                >
                    Previous
                </button>

                <button
                    className="btn btn-primary"
                    onClick={nextQuestion}
                >
                    Next
                </button>

            </div>

        </div>

    );

}

export default MockInterview;