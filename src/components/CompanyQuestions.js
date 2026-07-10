import { useState } from "react";

function CompanyQuestions() {

    const questions = {

        TCS: [
            "What is JVM?",
            "Difference between JDK and JRE?",
            "Explain OOP Principles",
            "Reverse a String",
            "SQL Joins"
        ],

        Infosys: [
            "Collections Framework",
            "Exception Handling",
            "Java 8 Features",
            "Normalization",
            "Spring Boot Annotations"
        ],

        Wipro: [
            "Multithreading",
            "Deadlock",
            "Array Programs",
            "Oops Concepts",
            "SQL Queries"
        ],

        Accenture: [
            "Java Basics",
            "REST API",
            "Spring Boot",
            "DSA",
            "HR Questions"
        ],

        Cognizant: [
            "String Programs",
            "Collections",
            "SQL",
            "Java 8",
            "Projects"
        ],

        Capgemini: [
            "Java",
            "DSA",
            "Database",
            "OOP",
            "HR"
        ]

    };

    const [company, setCompany] = useState("");

    return (

        <div className="card shadow mt-4">

            <div className="card-body">

                <h3>Company Wise Interview Questions</h3>

                <select
                    className="form-select mb-3"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >

                    <option value="">Select Company</option>

                    {Object.keys(questions).map((c) => (

                        <option key={c}>{c}</option>

                    ))}

                </select>

                {

                    company && (

                        <ul className="list-group">

                            {

                                questions[company].map((q, index) => (

                                    <li
                                        key={index}
                                        className="list-group-item"
                                    >

                                        {q}

                                    </li>

                                ))

                            }

                        </ul>

                    )

                }

            </div>

        </div>

    );

}

export default CompanyQuestions;