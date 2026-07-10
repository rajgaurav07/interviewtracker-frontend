import { useState, useEffect } from "react";
import axios from "axios";

function InterviewTracker() {

  const [interview, setInterview] = useState({
    company: "",
    role: "",
    email: "",
    interviewDate: "",
    status: "",
    notes: "",
  });

  const [interviews, setInterviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const result = await axios.get("https://interviewtracker-backend-2o4l.onrender.com/interviews");
      setInterviews(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInterview({
      ...interview,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId === null) {

        await axios.post(
          "https://interviewtracker-backend-2o4l.onrender.com/interviews",
          interview
        );

        alert("Interview Added Successfully");

      } else {

        await axios.put(
          `https://interviewtracker-backend-2o4l.onrender.com/interviews/${editId}`,
          interview
        );

        alert("Interview Updated Successfully");
        setEditId(null);

      }

      setInterview({
        company: "",
        role: "",
        email: "",
        interviewDate: "",
        status: "",
        notes: "",
      });

      loadInterviews();

    } catch (error) {
      console.log(error);
    }
  };

  const editInterview = (i) => {

    setInterview({
      company: i.company,
      role: i.role,
      email: i.email,
      interviewDate: i.interviewDate,
      status: i.status,
      notes: i.notes,
    });

    setEditId(i.id);

  };

  const deleteInterview = async (id) => {

    if (window.confirm("Delete this interview?")) {

      await axios.delete(
        `https://interviewtracker-backend-2o4l.onrender.com/interviews/${id}`
      );

      loadInterviews();

    }
  };

  const filteredInterviews = interviews.filter((i) =>
    i.company.toLowerCase().includes(search.toLowerCase())
  );

  const applied = interviews.filter(
    (i) => i.status === "Applied"
  ).length;

  const selected = interviews.filter(
    (i) => i.status === "Selected"
  ).length;

  const rejected = interviews.filter(
    (i) => i.status === "Rejected"
  ).length;

  return (

    <div className="container mt-4">

      <h2 className="text-center text-primary mb-4">
        Interview Tracker Dashboard
      </h2>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h5>Total</h5>
              <h2>{interviews.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white text-center">
            <div className="card-body">
              <h5>Applied</h5>
              <h2>{applied}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h5>Selected</h5>
              <h2>{selected}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white text-center">
            <div className="card-body">
              <h5>Rejected</h5>
              <h2>{rejected}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow p-4">

        <h3>Add / Update Interview</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Company Name"
            name="company"
            value={interview.company}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Job Role"
            name="role"
            value={interview.role}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Candidate Email"
            name="email"
            value={interview.email}
            onChange={handleChange}
          />

          <input
            type="date"
            className="form-control mb-3"
            name="interviewDate"
            value={interview.interviewDate}
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="status"
            value={interview.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <textarea
            className="form-control mb-3"
            placeholder="Notes"
            name="notes"
            value={interview.notes}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            {editId === null ? "Add Interview" : "Update Interview"}
          </button>

        </form>

      </div>

      <div className="card shadow mt-4 p-3">

        <h3 className="mb-3">All Interviews</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>

              <th>ID</th>
              <th>Company</th>
              <th>Role</th>
              <th>Email</th>
              <th>Interview Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>
                      {filteredInterviews.map((i) => (

              <tr key={i.id}>

                <td>{i.id}</td>

                <td>{i.company}</td>

                <td>{i.role}</td>

                <td>{i.email}</td>

                <td>{i.interviewDate}</td>

                <td>
                  <span
                    className={
                      i.status === "Selected"
                        ? "badge bg-success"
                        : i.status === "Rejected"
                        ? "badge bg-danger"
                        : i.status === "Interview Scheduled"
                        ? "badge bg-warning text-dark"
                        : "badge bg-primary"
                    }
                  >
                    {i.status}
                  </span>
                </td>

                <td>{i.notes}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editInterview(i)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteInterview(i.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default InterviewTracker;