import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path
            ? "btn btn-warning"
            : "btn btn-light";

    return (

        <div
            style={{
                width: "260px",
                background: "#0d6efd",
                color: "white",
                minHeight: "100vh",
                padding: "20px"
            }}
        >

            <h3 className="text-center mb-4">
                Interview Portal
            </h3>

            <div className="d-grid gap-3">
                <Link className="btn btn-light w-100 mb-2" to="/admin">
    👨‍💼 Admin Dashboard
</Link>

                <Link
                    className={isActive("/dashboard")}
                    to="/dashboard"
                >
                    🏠 Dashboard
                </Link>

                <Link
                    className={isActive("/interviews")}
                    to="/interviews"
                >
                    📋 Interview Tracker
                </Link>

                <Link
                    className={isActive("/preparation")}
                    to="/preparation"
                >
                    📚 Preparation Tracker
                </Link>

                <Link
                    className={isActive("/mock")}
                    to="/mock"
                >
                    🎯 Mock Interview
                </Link>

                <Link
                    className={isActive("/companies")}
                    to="/companies"
                >
                    🏢 Company Questions
                </Link>

                <Link
                    className={isActive("/analytics")}
                    to="/analytics"
                >
                    📊 Analytics
                </Link>
                <Link className="btn btn-light" to="/calendar">
    📅 Interview Calendar
</Link>

                <Link
                    className={isActive("/report")}
                    to="/report"
                >
                    🤖 AI Report
                </Link>

                <Link
                    className={isActive("/resume")}
                    to="/resume"
                >
                    📄 Resume
                </Link>
                <Link className="btn btn-light mb-2" to="/achievements">
    🏆 Achievements
</Link>

                <Link
                    className={isActive("/profile")}
                    to="/profile"
                >
                    👤 My Profile
                </Link>

                <button
                    className="btn btn-danger mt-3"
                    onClick={() => {

                        localStorage.clear();
                        window.location.href = "/";

                    }}
                >
                    🚪 Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;