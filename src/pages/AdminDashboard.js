import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalResumes: 0,
        totalInterviews: 0,
        totalPreparations: 0,
        totalAchievements: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com/admin/dashboard"
            );

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center text-primary mb-4">
                👨‍💼 Admin Dashboard
            </h2>

            <div className="row">
                            <div className="col-md-4 mb-4">
                <div className="card shadow border-primary">
                    <div className="card-body text-center">
                        <h1>👥</h1>
                        <h5>Total Users</h5>
                        <h2 className="text-primary">{stats.totalUsers}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card shadow border-success">
                    <div className="card-body text-center">
                        <h1>📄</h1>
                        <h5>Total Resumes</h5>
                        <h2 className="text-success">{stats.totalResumes}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
                <div className="card shadow border-warning">
                    <div className="card-body text-center">
                        <h1>💼</h1>
                        <h5>Total Interviews</h5>
                        <h2 className="text-warning">{stats.totalInterviews}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-6 mb-4">
                <div className="card shadow border-info">
                    <div className="card-body text-center">
                        <h1>📚</h1>
                        <h5>Total Preparations</h5>
                        <h2 className="text-info">{stats.totalPreparations}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-6 mb-4">
                <div className="card shadow border-danger">
                    <div className="card-body text-center">
                        <h1>🏆</h1>
                        <h5>Total Achievements</h5>
                        <h2 className="text-danger">{stats.totalAchievements}</h2>
                    </div>
                </div>
            </div>

        </div>
                <div className="card shadow mt-4">

            <div className="card-header bg-dark text-white">
                <h4>📈 Project Summary</h4>
            </div>

            <div className="card-body">

                <p>
                    <strong>Total Users:</strong> {stats.totalUsers}
                </p>

                <p>
                    <strong>Total Resumes:</strong> {stats.totalResumes}
                </p>

                <p>
                    <strong>Total Interviews:</strong> {stats.totalInterviews}
                </p>

                <p>
                    <strong>Total Preparation Topics:</strong> {stats.totalPreparations}
                </p>

                <p>
                    <strong>Total Achievements:</strong> {stats.totalAchievements}
                </p>

            </div>

        </div>

    </div>

);

}

export default AdminDashboard;
            