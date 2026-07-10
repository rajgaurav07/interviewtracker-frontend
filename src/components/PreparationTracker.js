import { useState, useEffect } from "react";
import axios from "axios";
import CompanyQuestions from "./CompanyQuestions";

function PreparationTracker() {

    const [preparation, setPreparation] = useState({
        company: "",
        topic: "",
        category: "",
        interviewRound: "",
        difficulty: "",
        hoursStudied: 0,
        confidence: 0,
        revisionCount: 0,
        status: ""
    });

    const [preparations, setPreparations] = useState([]);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadPreparations();
    }, []);

    const loadPreparations = async () => {
        try {
            const response = await axios.get("https://interviewtracker-backend-2o4l.onrender.com//preparations");
            setPreparations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setPreparation({
            ...preparation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editId === null) {

                await axios.post(
                    "https://interviewtracker-backend-2o4l.onrender.com//preparations",
                    preparation
                );

                alert("Preparation Added Successfully");

            } else {

                await axios.put(
                    `https://interviewtracker-backend-2o4l.onrender.com//preparations/${editId}`,
                    preparation
                );

                alert("Preparation Updated Successfully");
                setEditId(null);

            }

            setPreparation({
                company: "",
                topic: "",
                category: "",
                interviewRound: "",
                difficulty: "",
                hoursStudied: 0,
                confidence: 0,
                revisionCount: 0,
                status: ""
            });

            loadPreparations();

        } catch (error) {
            console.log(error);
        }
    };

    const editPreparation = (p) => {

        setPreparation({
            company: p.company,
            topic: p.topic,
            category: p.category,
            interviewRound: p.interviewRound,
            difficulty: p.difficulty,
            hoursStudied: p.hoursStudied,
            confidence: p.confidence,
            revisionCount: p.revisionCount,
            status: p.status
        });

        setEditId(p.id);

    };

    const deletePreparation = async (id) => {

        if (window.confirm("Delete this preparation?")) {

            try {

                await axios.delete(
                    `https://interviewtracker-backend-2o4l.onrender.com//preparations/${id}`
                );

                alert("Deleted Successfully");

                loadPreparations();

            } catch (error) {
                console.log(error);
            }

        }

    };

    const filteredPreparations = preparations.filter((p) => {

        const keyword = search.toLowerCase();

        return (
            p.topic.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword) ||
            (p.company && p.company.toLowerCase().includes(keyword))
        );

    });

    const totalTopics = preparations.length;

    const completed = preparations.filter(
        (p) => p.status === "Completed"
    ).length;

    const pending = totalTopics - completed;

    const totalHours = preparations.reduce(
        (sum, p) => sum + Number(p.hoursStudied || 0),
        0
    );

    const averageConfidence =
        preparations.length === 0
            ? 0
            : Math.round(
                  preparations.reduce(
                      (sum, p) => sum + Number(p.confidence || 0),
                      0
                  ) / preparations.length
              );

    const readinessScore =
        totalTopics === 0
            ? 0
            : Math.round(
                  (completed / totalTopics) * 40 +
                  (averageConfidence / 100) * 40 +
                  (Math.min(totalHours, 100) / 100) * 20
              );

    const weakTopics = preparations.filter(
        (p) => Number(p.confidence) < 60
    );

    const companyStats = {};

    preparations.forEach((p) => {

        if (!p.company) return;

        if (!companyStats[p.company]) {

            companyStats[p.company] = {
                total: 0,
                completed: 0
            };

        }

        companyStats[p.company].total++;

        if (p.status === "Completed") {
            companyStats[p.company].completed++;
        }

    });

    return (

    <div className="container mt-4">

        <h2 className="text-center text-primary mb-4">
            Interview Preparation Tracker
        </h2>

        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card bg-primary text-white text-center">
                    <div className="card-body">
                        <h5>Total Topics</h5>
                        <h2>{totalTopics}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-success text-white text-center">
                    <div className="card-body">
                        <h5>Completed</h5>
                        <h2>{completed}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-warning text-dark text-center">
                    <div className="card-body">
                        <h5>Pending</h5>
                        <h2>{pending}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card bg-info text-white text-center">
                    <div className="card-body">
                        <h5>Total Hours</h5>
                        <h2>{totalHours}</h2>
                    </div>
                </div>
            </div>

        </div>

        <div className="card shadow mb-4">

            <div className="card-body">

                <h3>Interview Readiness Score</h3>

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
                            ? "🟢 Ready for Interviews"
                            : readinessScore >= 60
                            ? "🟡 Keep Practicing"
                            : "🔴 Needs More Preparation"
                    }

                </h5>

            </div>

        </div>

        <div className="card shadow p-4">

            <h3>Add / Update Preparation</h3>

                <form onSubmit={handleSubmit}>

    <select
        className="form-select mb-3"
        name="company"
        value={preparation.company}
        onChange={handleChange}
    >
        <option value="">Select Company</option>
        <option>TCS</option>
        <option>Infosys</option>
        <option>Wipro</option>
        <option>Accenture</option>
        <option>Cognizant</option>
        <option>Capgemini</option>
        <option>Deloitte</option>
        <option>LTIMindtree</option>
        <option>IBM</option>
        <option>Amazon</option>
        <option>Microsoft</option>
        <option>Google</option>
    </select>

    <select
        className="form-select mb-3"
        name="interviewRound"
        value={preparation.interviewRound}
        onChange={handleChange}
    >
        <option value="">Select Interview Round</option>
        <option>Aptitude</option>
        <option>Technical Round 1</option>
        <option>Technical Round 2</option>
        <option>Managerial Round</option>
        <option>HR Round</option>
    </select>

    <select
        className="form-select mb-3"
        name="difficulty"
        value={preparation.difficulty}
        onChange={handleChange}
    >
        <option value="">Select Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
    </select>

    <input
        className="form-control mb-3"
        name="topic"
        placeholder="Topic Name"
        value={preparation.topic}
        onChange={handleChange}
    />

    <select
        className="form-select mb-3"
        name="category"
        value={preparation.category}
        onChange={handleChange}
    >
        <option value="">Select Category</option>
        <option>Java</option>
        <option>Spring Boot</option>
        <option>SQL</option>
        <option>DSA</option>
        <option>HTML/CSS</option>
        <option>JavaScript</option>
        <option>React</option>
        <option>HR</option>
        <option>Aptitude</option>
    </select>

    <input
        type="number"
        className="form-control mb-3"
        name="hoursStudied"
        placeholder="Hours Studied"
        value={preparation.hoursStudied}
        onChange={handleChange}
    />

    <input
        type="number"
        className="form-control mb-3"
        name="confidence"
        placeholder="Confidence (0-100)"
        value={preparation.confidence}
        onChange={handleChange}
    />

    <input
        type="number"
        className="form-control mb-3"
        name="revisionCount"
        placeholder="Revision Count"
        value={preparation.revisionCount}
        onChange={handleChange}
    />

    <select
        className="form-select mb-3"
        name="status"
        value={preparation.status}
        onChange={handleChange}
    >
        <option value="">Select Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
    </select>

    <button className="btn btn-primary w-100">
        {editId === null ? "Add Preparation" : "Update Preparation"}
    </button>

</form>

</div>
<div className="row mt-4">

    {/* Preparation Summary */}

    <div className="col-md-6">

        <div className="card shadow">

            <div className="card-body">

                <h4>Preparation Summary</h4>

                <ul className="list-group">

                    <li className="list-group-item">
                        Total Topics : <strong>{totalTopics}</strong>
                    </li>

                    <li className="list-group-item">
                        Completed : <strong>{completed}</strong>
                    </li>

                    <li className="list-group-item">
                        Pending : <strong>{pending}</strong>
                    </li>

                    <li className="list-group-item">
                        Total Hours : <strong>{totalHours}</strong>
                    </li>

                    <li className="list-group-item">
                        Average Confidence : <strong>{averageConfidence}%</strong>
                    </li>

                </ul>

            </div>

        </div>

    </div>

    {/* Weak Topics */}

    <div className="col-md-6">

        <div className="card shadow">

            <div className="card-body">

                <h4>Weak Topics</h4>

                {

                    weakTopics.length === 0 ?

                    <p className="text-success">
                        🎉 Excellent! No weak topics found.
                    </p>

                    :

                    weakTopics.map((topic) => (

                        <div
                            key={topic.id}
                            className="alert alert-warning"
                        >

                            <strong>{topic.topic}</strong>

                            <br />

                            Company : {topic.company}

                            <br />

                            Confidence : {topic.confidence}%

                        </div>

                    ))

                }

            </div>

        </div>

    </div>

</div>

{/* Company Dashboard */}

<div className="card shadow mt-4">

    <div className="card-body">

        <h3>Company Wise Progress</h3>

        <table className="table table-bordered">

            <thead className="table-dark">

                <tr>

                    <th>Company</th>
                    <th>Total Topics</th>
                    <th>Completed</th>
                    <th>Readiness</th>

                </tr>

            </thead>

            <tbody>

                {

                    Object.keys(companyStats).map((company) => {

                        const total = companyStats[company].total;

                        const completedCount =
                            companyStats[company].completed;

                        const score =
                            Math.round((completedCount / total) * 100);

                        return (

                            <tr key={company}>

                                <td>{company}</td>

                                <td>{total}</td>

                                <td>{completedCount}</td>

                                <td>

                                    <div className="progress">

                                        <div
                                            className="progress-bar bg-success"
                                            style={{
                                                width: `${score}%`
                                            }}
                                        >

                                            {score}%

                                        </div>

                                    </div>

                                </td>

                            </tr>

                        );

                    })

                }

            </tbody>

        </table>

    </div>

</div>

{/* Preparation Table */}

<div className="card shadow mt-4 p-3">

    <h3 className="mb-3">
        All Preparation Topics
    </h3>

    <input
        className="form-control mb-3"
        placeholder="Search Company / Topic / Category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <table className="table table-bordered table-hover">

        <thead className="table-dark">

            <tr>

                <th>ID</th>
                <th>Company</th>
                <th>Round</th>
                <th>Difficulty</th>
                <th>Topic</th>
                <th>Category</th>
                <th>Hours</th>
                <th>Confidence</th>
                <th>Revision</th>
                <th>Status</th>
                <th>Actions</th>

            </tr>

        </thead>

        <tbody>

            {

                filteredPreparations.map((p) => (

                    <tr key={p.id}>

                        <td>{p.id}</td>
                        <td>{p.company}</td>
                        <td>{p.interviewRound}</td>
                        <td>{p.difficulty}</td>
                        <td>{p.topic}</td>
                        <td>{p.category}</td>
                        <td>{p.hoursStudied}</td>
                        <td>{p.confidence}%</td>
                        <td>{p.revisionCount}</td>

                        <td>

                            <span
                                className={
                                    p.status === "Completed"
                                        ? "badge bg-success"
                                        : p.status === "In Progress"
                                        ? "badge bg-warning text-dark"
                                        : "badge bg-secondary"
                                }
                            >
                                {p.status}
                            </span>

                        </td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editPreparation(p)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deletePreparation(p.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))

            }

        </tbody>

    </table>

</div>
<div className="card shadow mt-4">

    <div className="card-body">

        <h3>AI Interview Readiness Report</h3>

        <h5>
            Overall Readiness :
            <span className="text-primary">
                {" "}{readinessScore}%
            </span>
        </h5>

        <hr />

        <h5>Strengths</h5>

        <ul>

            {preparations
                .filter(p => p.confidence >= 80)
                .map(p => (
                    <li key={p.id}>
                        {p.topic}
                    </li>
                ))}

        </ul>

        <h5>Weak Areas</h5>

        <ul>

            {preparations
                .filter(p => p.confidence < 60)
                .map(p => (
                    <li key={p.id}>
                        {p.topic}
                    </li>
                ))}

        </ul>

        <h5>Recommendations</h5>

        <ul>

            {averageConfidence < 70 &&
                <li>Increase overall confidence through revision.</li>
            }

            {pending > 0 &&
                <li>Complete all pending topics.</li>
            }

            {totalHours < 40 &&
                <li>Spend more time practicing coding questions.</li>
            }

            {weakTopics.length > 0 &&
                <li>Focus on weak topics before interviews.</li>
            }

        </ul>

        <hr />

        <h5>

            {
                readinessScore >= 80
                    ? "🟢 Ready for Most Service-Based Companies"
                    : readinessScore >= 60
                    ? "🟡 Almost Ready"
                    : "🔴 More Preparation Required"
            }

        </h5>

    </div>

</div>
<CompanyQuestions />

</div>

);

}

export default PreparationTracker;
