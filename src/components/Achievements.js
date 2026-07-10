import { useEffect, useState } from "react";
import axios from "axios";

function Achievements() {

    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        try {
            const response = await axios.get("https://interviewtracker-backend-2o4l.onrender.com/achievements");
            setAchievements(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const unlocked = achievements.filter(a => a.unlocked).length;
    const locked = achievements.length - unlocked;

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">
                🏆 Achievements & Badges
            </h2>

            <div className="row mb-4">

                <div className="col-md-4">
                    <div className="card bg-success text-white text-center shadow">
                        <div className="card-body">
                            <h5>Unlocked</h5>
                            <h2>{unlocked}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-secondary text-white text-center shadow">
                        <div className="card-body">
                            <h5>Locked</h5>
                            <h2>{locked}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-primary text-white text-center shadow">
                        <div className="card-body">
                            <h5>Total Badges</h5>
                            <h2>{achievements.length}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">

                {achievements.map((achievement) => (

                    <div className="col-md-6 col-lg-4 mb-4" key={achievement.id}>

                        <div className="card shadow h-100">

                            <div className="card-body">

                                <div className="text-center mb-3">

                                    <h1>
                                        {achievement.unlocked ? "🏆" : "🔒"}
                                    </h1>

                                    <h4>{achievement.title}</h4>

                                    <h6>{achievement.badge}</h6>

                                </div>

                                <p>{achievement.description}</p>

                                <div className="progress mb-3" style={{ height: "20px" }}>

                                    <div
                                        className={
                                            achievement.unlocked
                                                ? "progress-bar bg-success"
                                                : "progress-bar bg-warning"
                                        }
                                        style={{
                                            width: `${achievement.progress}%`
                                        }}
                                    >
                                        {achievement.progress}%
                                    </div>

                                </div>

                                <div className="text-center">

                                    <span
                                        className={
                                            achievement.unlocked
                                                ? "badge bg-success"
                                                : "badge bg-secondary"
                                        }
                                    >
                                        {achievement.unlocked
                                            ? "Unlocked"
                                            : "Locked"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Achievements;