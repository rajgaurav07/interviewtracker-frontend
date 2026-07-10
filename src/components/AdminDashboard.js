import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [stats, setStats] = useState({
        interviews: 0,
        preparations: 0,
        achievements: 0,
        users: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {

            const interviews = await axios.get("https://interviewtracker-backend-2o4l.onrender.com//interviews");
            const preparations = await axios.get("https://interviewtracker-backend-2o4l.onrender.com//preparations");
            const achievements = await axios.get("https://interviewtracker-backend-2o4l.onrender.com//achievements");
            const users = await axios.get("https://interviewtracker-backend-2o4l.onrender.com//users");

            setStats({
                interviews: interviews.data.length,
                preparations: preparations.data.length,
                achievements: achievements.data.length,
                users: users.data.length
            });

        } catch (e) {
            console.log(e);
        }
    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">
                📊 Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="card bg-primary text-white shadow">
                        <div className="card-body text-center">
                            <h5>Total Interviews</h5>
                            <h2>{stats.interviews}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-success text-white shadow">
                        <div className="card-body text-center">
                            <h5>Preparation Topics</h5>
                            <h2>{stats.preparations}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-warning text-dark shadow">
                        <div className="card-body text-center">
                            <h5>Achievements</h5>
                            <h2>{stats.achievements}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card bg-danger text-white shadow">
                        <div className="card-body text-center">
                            <h5>Users</h5>
                            <h2>{stats.users}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;