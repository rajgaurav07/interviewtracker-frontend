import { useState, useEffect } from "react";
import axios from "axios";

function Home() {

    const userName = localStorage.getItem("userName");
    const [totalInterviews, setTotalInterviews] = useState(0);
    const [totalTopics, setTotalTopics] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [readiness, setReadiness] = useState(0);
    const [upcomingInterview, setUpcomingInterview] = useState(null);

    // New Dashboard Stats
    const [totalBadges, setTotalBadges] = useState(0);
    const [applied, setApplied] = useState(0);
    const [selected, setSelected] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [completedTopics, setCompletedTopics] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const interviewResponse = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com//interviews"
            );

            const preparationResponse = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com//preparations"
            );

            const achievementResponse = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com//achievements"
            );

            const interviews = interviewResponse.data;
            const preparations = preparationResponse.data;
            const achievements = achievementResponse.data;

            setTotalInterviews(interviews.length);
            setTotalTopics(preparations.length);
            setTotalBadges(achievements.length);

            const totalHoursStudied = preparations.reduce(
                (sum, p) => sum + Number(p.hoursStudied || 0),
                0
            );

            setTotalHours(totalHoursStudied);

            const completed = preparations.filter(
                p => p.status === "Completed"
            ).length;

            setCompletedTopics(completed);

            setApplied(
                interviews.filter(
                    i => i.status === "Applied"
                ).length
            );

            setSelected(
                interviews.filter(
                    i => i.status === "Selected"
                ).length
            );

            setRejected(
                interviews.filter(
                    i => i.status === "Rejected"
                ).length
            );

            const averageConfidence =
                preparations.length === 0
                    ? 0
                    : preparations.reduce(
                        (sum, p) => sum + Number(p.confidence || 0),
                        0
                    ) / preparations.length;

            const readinessScore =
                preparations.length === 0
                    ? 0
                    : Math.round(
                        (completed / preparations.length) * 50 +
                        (averageConfidence / 100) * 50
                    );

            setReadiness(readinessScore);

            const upcoming = interviews
                .filter(
                    i =>
                        i.interviewDate &&
                        new Date(i.interviewDate) >= new Date()
                )
                .sort(
                    (a, b) =>
                        new Date(a.interviewDate) -
                        new Date(b.interviewDate)
                );

            if (upcoming.length > 0) {
                setUpcomingInterview(upcoming[0]);
            } else {
                setUpcomingInterview(null);
            }

        } catch (error) {

            console.log(error);

        }

    };
    return (

    <div className="container mt-5">

       <h1 className="text-primary">
    Welcome {userName} 👋
</h1>

        <hr />

        <h3>Your Interview Preparation Dashboard</h3>

        <div className="row mt-4">

            <div className="col-md-3 mb-3">
                <div className="card shadow border-primary">
                    <div className="card-body text-center">
                        <h5>Total Interviews</h5>
                        <h2>{totalInterviews}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-success">
                    <div className="card-body text-center">
                        <h5>Total Topics</h5>
                        <h2>{totalTopics}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-warning">
                    <div className="card-body text-center">
                        <h5>Total Hours</h5>
                        <h2>{totalHours}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-danger">
                    <div className="card-body text-center">
                        <h5>Readiness</h5>
                        <h2>{readiness}%</h2>
                    </div>
                </div>
            </div>

        </div>

        {/* Second Row */}

        <div className="row mt-2">

            <div className="col-md-3 mb-3">
                <div className="card shadow border-info">
                    <div className="card-body text-center">
                        <h5>🏆 Badges</h5>
                        <h2>{totalBadges}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-primary">
                    <div className="card-body text-center">
                        <h5>📄 Applied</h5>
                        <h2>{applied}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-success">
                    <div className="card-body text-center">
                        <h5>🎉 Selected</h5>
                        <h2>{selected}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-3">
                <div className="card shadow border-danger">
                    <div className="card-body text-center">
                        <h5>❌ Rejected</h5>
                        <h2>{rejected}</h2>
                    </div>
                </div>
            </div>

        </div>

        {/* Progress */}

        <div className="card shadow mt-4">

            <div className="card-body">

                <h4>Preparation Progress</h4>

                <div className="progress mt-3" style={{ height: "30px" }}>

                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        style={{ width: `${readiness}%` }}
                    >
                        {readiness}%
                    </div>

                </div>

                <div className="mt-3">

                    <strong>Completed Topics :</strong> {completedTopics} / {totalTopics}

                </div>

            </div>

        </div>
                <div className="card shadow mt-5">

            <div className="card-body">

                <h3>📅 Upcoming Interview</h3>

                {upcomingInterview ? (

                    <>

                        <h4 className="text-primary">
                            {upcomingInterview.company}
                        </h4>

                        <hr />

                        <div className="row">

                            <div className="col-md-6">
                                <p><strong>Role:</strong> {upcomingInterview.role}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Date:</strong> {upcomingInterview.interviewDate}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Status:</strong> {upcomingInterview.status}</p>
                            </div>

                            <div className="col-md-6">
                                <p><strong>Notes:</strong> {upcomingInterview.notes || "No Notes"}</p>
                            </div>

                        </div>

                    </>

                ) : (

                    <div className="text-center">

                        <h5 className="text-danger">
                            No Upcoming Interviews
                        </h5>

                        <p className="text-muted">
                            Add an interview to see it here.
                        </p>

                    </div>

                )}

            </div>

        </div>

    </div>

);

}

export default Home;