import { useEffect, useState } from "react";
import axios from "axios";

function ResumeUpload() {

    const [file, setFile] = useState(null);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {

        try {

            const response = await axios.get(
                "https://interviewtracker-backend-2o4l.onrender.com//resume/latest"
            );

            setResume(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const uploadResume = async () => {

        if (!file) {

            alert("Please select a resume.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            await axios.post(
                "https://interviewtracker-backend-2o4l.onrender.com//resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Resume Uploaded Successfully");

            setFile(null);

            loadResume();

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        }

    };

    const deleteResume = async () => {

        if (!resume) return;

        if (!window.confirm("Delete Resume?")) return;

        await axios.delete(
            `https://interviewtracker-backend-2o4l.onrender.com//resume/${resume.id}`
        );

        alert("Resume Deleted");

        setResume(null);

    };

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="text-primary mb-4">

                    Resume Management

                </h2>

                <input
                    type="file"
                    className="form-control mb-3"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    className="btn btn-primary mb-4"
                    onClick={uploadResume}
                >

                    {resume ? "Replace Resume" : "Upload Resume"}

                </button>

                {resume && (

                    <div className="alert alert-success">

                        <h5>Uploaded Resume</h5>

                        <p>

                            <strong>Name:</strong> {resume.fileName}

                        </p>

                        <p>

                            <strong>Uploaded:</strong> {resume.uploadDate}

                        </p>

                        <a
                            href={`https://interviewtracker-backend-2o4l.onrender.com//resume/download/${resume.id}`}
                            className="btn btn-success me-2"
                        >
                            Download
                        </a>

                        <button
                            className="btn btn-danger"
                            onClick={deleteResume}
                        >
                            Delete
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ResumeUpload;