import React, { useState } from 'react';
import { sendChat, getChat, endSession } from '../../controllers/SessionController';

function TutorCoursePage({ course, setSelectedContent }) {
    const [chatInput, setChatInput] = useState('');
    const [chatOutput, setChatOutput] = useState(course.chatMessages);

    const handleChatInputChange = (e) => {
        setChatInput(e.target.value);
    };

    const handleSendChat = async () => {
        if (chatInput.trim()) {
            await sendChat(course.id, "tutor", chatInput);
            setChatInput('');
        }
    };


    const handleEndCourse = async () => {
        await endSession(course.id);
    };

    React.useEffect(() => {
        async function fetchData() {
            const chat = await getChat(course.id);
            setChatOutput(chat);
        }
        fetchData();
    }, [course]);

    React.useEffect(() => {
        const interval = setInterval(async () => {
            const chat = await getChat(course.id);
            setChatOutput(chat);
        }, 5000); // Fetch chat messages every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [course.id]);

    if (!course) return <div>No course selected</div>;

    // const handleFileChange = (event) => {
    //     setUserData(prev => ({ ...prev, proofdoc: event.target.files[0] }));
    //     console.log(event.target.files[0]);
    // };

    return (
        <div className="courseDetailsPage">

            <div className="courseOperations">
                <button className="backButton" onClick={() => setSelectedContent('myCourses')}>
                    &larr;
                </button>
                {/* Course Actions */}
                <div className="courseActions">
                    <button className="endButton" onClick={handleEndCourse}>End Course</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="courseContainer">
                {/* Left Section */}
                <div className="leftSection">
                    <div className="tutorDetails">
                        <div className="tutorHeader">
                            <h3>{course.student || 'Student\'s Name'}</h3>
                            <img
                                src={course.profilePicture || '/default-profile.png'}
                                alt="Student Profile"
                                className="profilePicture"
                            />
                        </div>
                        <p>{course.description || 'Description not available.'}</p>
                    </div>
                    <div className="resources">
                        <h3>Resources</h3>
                        {/* <form onSubmit={handleProofSubmit}>
            <input type="file" accept=".jpg,.png" onChange={handleFileChange} required />
            <button type="submit" className="register-button">Submit Resource</button>
          </form> */}
                        {course.resources && course.resources.length > 0 ? (
                            course.resources.map((res, index) => <p key={index}>{res}</p>)
                        ) : (
                            <p>No resources available.</p>
                        )}
                    </div>
                </div>

                <div className="rightSection">
                    <div className="progressContainer">
                        <h3>Progress</h3>
                        <div className="progressCircle">
                            <span>{course.progress || 0}%</span>
                        </div>
                        <p>{course.duration || 0} min</p>
                    </div>
                    <div className="chatContainer">
                        <h3>Chat</h3>
                        <div className="chatMessages">
                            {course.chatMessages && course.chatMessages.length > 0 ? (
                                chatOutput.map((msg, index) => (
                                    <p key={index}>
                                        <strong>{msg.sender === 'student' ? course.student : course.tutor}:</strong> {msg.message}
                                    </p>
                                ))
                            ) : (
                                <p>No chat messages available.</p>
                            )}
                        </div>
                        <div className="chatInputContainer">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="chatInput"
                                value={chatInput}
                                onChange={handleChatInputChange}
                            />
                            <button className="sendButton" onClick={handleSendChat}>
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="classLink">
                        <h3>Class Link</h3>
                        {course.classLink ? (
                            <>
                                <a href={course.classLink} target="_blank" rel="noopener noreferrer">
                                    {course.classLink}
                                </a>
                                <button className="copyButton" onClick={() => navigator.clipboard.writeText(course.classLink)}>
                                    Copy
                                </button>
                            </>
                        ) : (
                            <p>No link provided.</p>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* General Layout */
                .courseDetailsPage {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                    font-family: Arial, sans-serif;
                }

                .courseOperations {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                }

                .backButton {
                    font-size: 1.5rem;
                    border: none;
                    background: none;
                    cursor: pointer;
                }

                .courseContainer {
                    display: grid;
                    grid-template-columns: 3fr 2fr;
                    gap: 20px;
                    padding: 20px;
                    flex-grow: 1;
                }

                /* Left Section */
                .leftSection {
                    display: flex;
                    flex-direction: column;
                }

                .tutorDetails {
                    background: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                .tutorHeader {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20rem;
                }

                .tutorDetails h3 {
                    margin: 0;
                }

                .profilePicture {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }

                .resources {
                    background: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    flex-grow: 1;
                }

                /* Right Section */
                .rightSection {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .progressContainer,
                .chatContainer,
                .classLink {
                    background: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                }

                .chatContainer {
                    flex-grow: 1;
                }

                .progressCircle {
                    width: 80px;
                    height: 80px;
                    border: 6px solid #007bff;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    margin: 10px 0;
                }

                .chatContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .chatMessages {
                    max-height: 150px;
                    overflow-y: auto;
                    margin-bottom: 10px;
                }

                .chatInputContainer {
                    margin-top: 30rem;
                    display: flex;
                    gap: 10px;
                }

                .chatInput {
                    flex-grow: 1;
                    padding: 5px;
                }

                .sendButton {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                /* Class Link */
                .classLink a {
                    display: inline-block;
                    margin-right: 10px;
                }

                .copyButton {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                /* Course Actions */
                .courseActions {
                    display: flex;
                    gap: 10px;
                }

                .rateButton,
                .endButton {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .endButton {
                    background: #dc3545;
                }
            `}</style>
        </div>
    );
}
export default TutorCoursePage;