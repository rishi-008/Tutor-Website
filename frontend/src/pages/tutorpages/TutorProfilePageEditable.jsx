import React, { useState } from 'react';
import { updateTutorDescription, updateTutorCourses, getTutorById } from "../../controllers/AccountController";

const TutorProfilePageEditable = (props) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingCourses, setIsEditingCourses] = useState(false);
    const [description, setDescription] = useState('');
    const [courses, setCourses] = useState([]);
    const [newlyAddedCourses, setNewlyAddedCourses] = useState([]);
    const [tutorInfo, setTutorInfo] = useState({});

    React.useEffect(() => {
        async function fetchData() {
            const latestTutorInfo = await getTutorById(props.tutor.id);
            setTutorInfo(latestTutorInfo);
            setDescription(latestTutorInfo.tutor.description);
            setCourses(latestTutorInfo.tutor.courses);
        }
        fetchData();
    }, []);

    const handleEditDescriptionClick = () => {
        setIsEditingDescription(true);
    };

    const handleSaveDescriptionClick = () => {
        setIsEditingDescription(false);
        console.log("this is the description it should be changed to", description);
        updateTutorDescription(props.tutor.id, description);
        // Save the updated description to the tutor object or send it to the server
    };

    const handleEditCoursesClick = () => {
        setIsEditingCourses(true);
    };

    const handleSaveCoursesClick = () => {
        console.log("these are the coursews we're sending and should be updated: ", newlyAddedCourses);
        setIsEditingCourses(false);
        updateTutorCourses(props.tutor.id, newlyAddedCourses);
        // Save the updated courses to the tutor object or send it to the server
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCoursesChange = (index, event) => {
        const newCourses = [...courses];
        newCourses[index] = event.target.value;
        setNewlyAddedCourses(newCourses.filter(course => !courses.includes(course)));
        setCourses(newCourses);
    };

    const handleAddCourse = () => {
        setCourses([...courses, '']);
    };

    const handleRemoveCourse = (index) => {
        const newCourses = courses.slice(0, index).concat(courses.slice(index + 1));
        setCourses(newCourses);
        setNewlyAddedCourses(newCourses.filter(course => !courses.includes(course)));
    };

    const tutor = tutorInfo.tutor || { tutor: {} };

    if (!tutor) {
        return <div>No tutor data available</div>;
    }

    return (
        <>
            <div className="profile-container">
                <div className="banner">Banner</div>
                <div className="tutor-info">
                    <div className="profile-pic"></div>
                    <div className="info">
                        <h2>{tutor.name}</h2>
                        <p>Education: {tutor.education}</p>
                        <p>Rating: {tutor.rating}/5</p>
                    </div>
                </div>
                <div className="content">
                    <div className="about"></div>
                    {isEditingDescription ? (
                        <textarea className="large-textarea" value={description} onChange={handleDescriptionChange} />
                    ) : (
                        <p>{description}</p>
                    )}
                    {isEditingDescription ? (
                        <button onClick={handleSaveDescriptionClick}>Save</button>
                    ) : (
                        <button onClick={handleEditDescriptionClick}>Edit</button>
                    )}
                </div>
                <div className="courses">
                    <h3>Courses Taught</h3>
                    <div className="course-list">
                        {isEditingCourses ? (
                            <>
                                {courses.map((course, index) => (
                                    <div key={index} className="course-edit">
                                        <input
                                            type="text"
                                            value={course}
                                            onChange={(event) => handleCoursesChange(index, event)}
                                        />
                                        <button onClick={() => handleRemoveCourse(index)}>Remove</button>
                                    </div>
                                ))}
                                <button onClick={handleAddCourse}>Add Course</button>
                                <button onClick={handleSaveCoursesClick}>Save</button>
                            </>
                        ) : (
                            courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <span key={index} className="course">{course}</span>
                                ))
                            ) : (
                                <p>No courses available</p>
                            )
                        )}
                    </div>
                    {!isEditingCourses && <button onClick={handleEditCoursesClick}>Edit</button>}
                </div>
            </div>
            <style jsx>{`
                body, html {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    height: 100%;
                }
                .profile-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background-color: #fff;
                }
                .banner {
                    background-color: #e0e0e0;
                    color: #666;
                    text-align: center;
                    padding: 50px;
                    font-size: 20px;
                    font-weight: bold;
                }
                .tutor-info {
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .profile-pic {
                    width: 100px;
                    height: 100px;
                    background-color: #ccc;
                    border-radius: 50%;
                }
                .info {
                    margin-left: 20px;
                }
                .info h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .info p {
                    margin: 5px 0;
                    color: #555;
                }
                .content {
                    padding: 20px;
                }
                .about {
                    margin-bottom: 20px;
                }
                .courses {
                    padding: 20px;
                    border-top: 1px solid #ddd;
                    background-color: #f8f8f8;
                }
                .courses h3 {
                    margin-bottom: 10px;
                    font-size: 20px;
                }
                .course-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .course {
                    background-color: #f0f0f0;
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                }
                .course-edit {
                    display: flex;
                    gap: 10px;
                }
                .course-edit input {
                    flex-grow: 1;
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .large-textarea {
                    width: 100%;
                    height: 200px;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
            `}</style>
        </>
    );
};

export default TutorProfilePageEditable;