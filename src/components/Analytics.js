import { useState, useEffect } from "react";
import axios from "axios";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
} from "chart.js";

import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
);

function Analytics() {

    const [preparations, setPreparations] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const response = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com/preparations"
            );

            setPreparations(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const totalTopics = preparations.length;

    const completed = preparations.filter(
        p => p.status === "Completed"
    ).length;

    const pending = totalTopics - completed;

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

    // Category Wise Hours

    const categoryMap = {};

    preparations.forEach((p) => {

        if (!categoryMap[p.category]) {

            categoryMap[p.category] = 0;

        }

        categoryMap[p.category] += Number(p.hoursStudied || 0);

    });

    const barData = {

        labels: Object.keys(categoryMap),

        datasets: [

            {

                label: "Hours Studied",

                data: Object.values(categoryMap),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6610f2",
                    "#20c997",
                    "#fd7e14",
                    "#6f42c1"
                ]

            }

        ]

    };

    const doughnutData = {

        labels: ["Completed", "Pending"],

        datasets: [

            {

                data: [completed, pending],

                backgroundColor: [

                    "#198754",

                    "#dc3545"

                ]

            }

        ]

    };

    const lineData = {

        labels: preparations.map((p) => p.topic),

        datasets: [

            {

                label: "Confidence",

                data: preparations.map((p) => p.confidence),

                borderColor: "#0d6efd",

                backgroundColor: "#0d6efd",

                fill: false,

                tension: 0.4

            }

        ]

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-primary mb-4">

                Analytics Dashboard

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

                            <h5>Total Hours</h5>

                            <h2>{totalHours}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card bg-info text-white text-center">

                        <div className="card-body">

                            <h5>Confidence</h5>

                            <h2>{averageConfidence}%</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-md-6">

                    <div className="card shadow p-3">

                        <h4 className="text-center">

                            Completed vs Pending

                        </h4>

                        <Doughnut data={doughnutData} />

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow p-3">

                        <h4 className="text-center">

                            Hours by Category

                        </h4>

                        <Bar data={barData} />

                    </div>

                </div>

            </div>

            <div className="card shadow mt-4 p-3">

                <h4 className="text-center">

                    Confidence Trend

                </h4>

                <Line data={lineData} />

            </div>

        </div>

    );

}

export default Analytics;