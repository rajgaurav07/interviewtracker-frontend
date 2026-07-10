import { useState, useEffect } from "react";
import axios from "axios";

function AIReport() {

    const [preparations, setPreparations] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get("https://interviewtracker-backend-2o4l.onrender.com/preparations");
            setPreparations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const totalTopics = preparations.length;

    const completed = preparations.filter(
        p => p.status === "Completed"
    ).length;

    const totalHours = preparations.reduce(
        (sum, p) => sum + Number(p.hoursStudied || 0),
        0
    );

    const averageConfidence =
        totalTopics === 0
            ? 0
            : Math.round(
                  preparations.reduce(
                      (sum, p) => sum + Number(p.confidence || 0),
                      0
                  ) / totalTopics
              );

    const readinessScore =
        totalTopics === 0
            ? 0
            : Math.round(
                  (completed / totalTopics) * 40 +
                  (averageConfidence / 100) * 40 +
                  (Math.min(totalHours, 100) / 100) * 20
              );

    const strongTopics = preparations.filter(
        p => p.confidence >= 80
    );

    const weakTopics = preparations.filter(
        p => p.confidence < 60
    );

    const companyMap = {};

    preparations.forEach((p) => {

        if (!companyMap[p.company]) {

            companyMap[p.company] = 0;

        }

        companyMap[p.company]++;

    });

    let recommendedCompany = "No Recommendation";

    let max = 0;

    Object.keys(companyMap).forEach((company) => {

        if (companyMap[company] > max) {

            max = companyMap[company];
            recommendedCompany = company;

        }

    });
    const downloadPDF = async () => {

    try {

        const response = await axios.get(
            "https://interviewtracker-backend-2o4l.onrender.com/report/pdf",
            {
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "Interview_Readiness_Report.pdf"
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

    } catch (error) {

        console.log(error);

        alert("PDF Download Failed");

    }

};

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">
                🤖 AI Interview Readiness Report
            </h2>
            <div className="text-end mb-3">

    <button
        className="btn btn-danger"
        onClick={downloadPDF}
    >
        📄 Download AI Report PDF
    </button>

</div>

            <div className="card shadow p-4">

                <h4>Overall Readiness Score</h4>

                <div
                    className="progress mb-3"
                    style={{ height: "30px" }}
                >

                    <div
                        className={
                            readinessScore >= 80
                                ? "progress-bar bg-success"
                                : readinessScore >= 60
                                ? "progress-bar bg-warning"
                                : "progress-bar bg-danger"
                        }
                        style={{
                            width: `${readinessScore}%`
                        }}
                    >
                        {readinessScore}%
                    </div>

                </div>

                <h5>

                    {
                        readinessScore >= 80
                            ? "🟢 Interview Ready"
                            : readinessScore >= 60
                            ? "🟡 Keep Practicing"
                            : "🔴 Needs More Preparation"
                    }

                </h5>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4>💪 Strong Topics</h4>

                            {
                                strongTopics.length === 0 ?

                                <p>No Strong Topics Yet</p>

                                :

                                strongTopics.map(topic => (

                                    <div
                                        key={topic.id}
                                        className="alert alert-success"
                                    >

                                        {topic.topic}

                                        ({topic.confidence}%)

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4>⚠ Weak Topics</h4>

                            {
                                weakTopics.length === 0 ?

                                <p className="text-success">

                                    Excellent!

                                </p>

                                :

                                weakTopics.map(topic => (

                                    <div
                                        key={topic.id}
                                        className="alert alert-warning"
                                    >

                                        {topic.topic}

                                        ({topic.confidence}%)

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h4>🤖 AI Suggestions</h4>

                    <ul>

                        {
                            weakTopics.length > 0 &&

                            <li>
                                Revise weak topics regularly.
                            </li>
                        }

                        {
                            averageConfidence < 80 &&

                            <li>
                                Increase confidence above 80%.
                            </li>
                        }

                        {
                            completed < totalTopics &&

                            <li>
                                Complete all pending topics.
                            </li>
                        }

                        <li>
                            Take at least 2 Mock Interviews every week.
                        </li>

                        <li>
                            Practice coding on LeetCode daily.
                        </li>

                    </ul>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="card bg-info text-white">

                        <div className="card-body">

                            <h4>🏢 Recommended Company</h4>

                            <h2>{recommendedCompany}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card bg-dark text-white">

                        <div className="card-body">

                            <h4>🎯 Success Probability</h4>

                            <h2>{readinessScore}%</h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AIReport;