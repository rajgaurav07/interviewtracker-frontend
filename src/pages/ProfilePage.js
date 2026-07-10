import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function ProfilePage() {

    const email = localStorage.getItem("userEmail");

    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        college: "",
        degree: "",
        cgpa: "",
        role: "",
        experience: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        aboutMe: "",
        skills: ""
    });

   useEffect(() => {

    const loadProfile = async () => {

        try {

            const response = await axios.get(
                `https://interviewtracker-backend-2o4l.onrender.com/profile/${email}`
            );

            setProfile(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    loadProfile();

}, [email]);

    const handleChange = (e) => {

        setProfile({

            ...profile,
            [e.target.name]: e.target.value

        });

    };

    const saveProfile = async () => {

        try {

            await axios.put(
                "https://interviewtracker-backend-2o4l.onrender.com/profile",
                profile
            );

            alert("Profile Updated Successfully");

        } catch (error) {

            alert("Unable to Update Profile");

        }

    };
    return (

    <Layout>

        <div className="container mt-4">

            <h2 className="text-primary mb-4">
                My Profile
            </h2>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={profile.name || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={profile.email || ""}
                                disabled
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                College
                            </label>

                            <input
                                type="text"
                                name="college"
                                className="form-control"
                                value={profile.college || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Degree
                            </label>

                            <input
                                type="text"
                                name="degree"
                                className="form-control"
                                value={profile.degree || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                CGPA
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="cgpa"
                                className="form-control"
                                value={profile.cgpa || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                className="form-control"
                                value={profile.role || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Experience
                            </label>

                            <input
                                type="text"
                                name="experience"
                                className="form-control"
                                value={profile.experience || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={profile.phone || ""}
                                onChange={handleChange}
                            />

                        </div>
                                                <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={profile.location || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                LinkedIn
                            </label>

                            <input
                                type="text"
                                name="linkedin"
                                className="form-control"
                                value={profile.linkedin || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                GitHub
                            </label>

                            <input
                                type="text"
                                name="github"
                                className="form-control"
                                value={profile.github || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 mb-3">

                            <label className="form-label">
                                Skills
                            </label>

                            <textarea
                                rows="3"
                                name="skills"
                                className="form-control"
                                value={profile.skills || ""}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 mb-4">

                            <label className="form-label">
                                About Me
                            </label>

                            <textarea
                                rows="4"
                                name="aboutMe"
                                className="form-control"
                                value={profile.aboutMe || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="text-center">

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={saveProfile}
                        >
                            Save Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </Layout>

);

}

export default ProfilePage;