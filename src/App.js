import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAdmin } from "./utils/Auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewPage from "./pages/InterviewPage";
import PreparationPage from "./pages/PreparationPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import CompanyPage from "./pages/CompanyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import ReportPage from "./pages/ReportPage";
import ResumePage from "./pages/ResumePage";
import CalendarPage from "./pages/CalendarPage";
import AchievementsPage from "./pages/AchievementsPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interviews" element={<InterviewPage />} />
        <Route path="/preparation" element={<PreparationPage />} />
        <Route path="/mock" element={<MockInterviewPage />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />

        <Route
          path="/admin"
          element={
            isAdmin() ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;