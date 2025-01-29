import React, { useState } from 'react';
import PendingStudentConnectionRequestModal from '../../components/PendingStudentConnectionRequestModal';

function StudentMyCoursesPage({ setSelectedContent, setSelectedCourse, inProgressCourses, pendingCourses, declinedCourses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTutorPendingCourseRequestDecisionModalOpen, setIsTutorPendingCourseRequestDecisionModalOpen] = useState(false);
    const [modalCategory, setModalCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setSelectedContent('course');
    };

    const handlePendingCourseClick = (course) => {
        
    };

    const displayedInProgressCourses = inProgressCourses.slice(0, 3);
    const displayedPendingCourses = pendingCourses.slice(0, 3);
    const displayedDeclinedCourses = declinedCourses.slice(0, 3);

    const openModal = (category) => {
        setModalCategory(category);
        setCurrentPage(1); // Reset to the first page
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalCategory(null);
    };

    const paginatedCourses = (courses) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return courses.slice(startIndex, startIndex + itemsPerPage);
    };

    const totalPages = (courses) => Math.ceil(courses.length / itemsPerPage);
    return (
        <div className="coursesContainer">
            {/* In Progress Section */}
            <div className="coursesSection largeSection">
                <h2>In Progress</h2>
                <div className="courseCards">
                    {displayedInProgressCourses.map(course => (
                        <div
                            className="courseCard fullLengthCard"
                            key={course.id}
                            onClick={() => handleCourseClick(course)}
                        >
                            <div className="profileSection">
                                <img src={course.profilePicture} alt="Student" className="profileImage" />
                            </div>
                            <div className="courseInfo">
                                <p className="studentName"><b>Tutor:</b> {course.tutor}</p>
                                <p className="focus"><b>Focus:</b> {course.focus}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="seeMoreButton" onClick={() => openModal('inProgress')}>See More</button>
            </div>

            {/* Pending Section */}
            <div className="coursesSection largeSection">
                <h2>Pending</h2>
                <div className="courseCards">
                    {displayedPendingCourses.map(course => (
                        <div key={course.id} className="courseCard fullLengthCard">
                            <div className="profileSection">
                                <img src={course.profilePicture} alt="Student" className="profileImage" />
                            </div>
                            <div className="courseInfo">
                                <p className="studentName"><b>Tutor:</b> {course.tutor}</p>
                                <p className="focus"><b>Focus:</b> {course.focus}</p>
                                <p className="message"><b>Your Message:</b> {course.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="seeMoreButton" onClick={() => openModal('pending')}>See More</button>
            </div>

            {/* Declined Section */}
            <div className="coursesSection fullSection">
                <h2>Declined</h2>
                <div className="courseCardsDeclined">
                    {displayedDeclinedCourses.map(course => (
                        <div key={course.id} className="courseCard declinedCards">
                            <div className="profileSection">
                                <img src={course.profilePicture} alt="Tutor" className="profileImage" />
                            </div>
                            <div className="courseInfo">
                                <p className="studentName"><b>Tutor:</b> {course.tutor}</p>
                                <p className="focus"><b>Focus:</b> {course.focus}</p>
                                <p className="reason"><b>Reason for Rejection:</b> {course.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="seeMoreButton" onClick={() => openModal('declined')}>See More</button>
            </div>

            {isModalOpen && (
                <PendingStudentConnectionRequestModal
                courses={modalCategory === 'inProgress' ? inProgressCourses
                    : modalCategory === 'pending' ? pendingCourses
                        : declinedCourses}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemsPerPage={modalCategory === 'inProgress' ? 5 : 3}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
                // <div className="modalOverlay">
                //     <div className="modalContent">
                //         <h2>{modalCategory === 'inProgress' ? 'In Progress' : modalCategory === 'pending' ? 'Pending' : 'Declined'}</h2>
                //         <div className="modalCourseCards">
                //             {paginatedCourses(
                //                 modalCategory === 'inProgress' ? inProgressCourses
                //                     : modalCategory === 'pending' ? pendingCourses
                //                         : declinedCourses
                //             ).map(course => (
                //                 <div key={course.id} className="courseCard fullLengthCard">
                //                     <div className="profileSection">
                //                         <img src={course.profilePicture} alt="Profile" className="profileImage" />
                //                     </div>
                //                     <div className="courseInfo">
                //                         <p className="studentName"><b>Tutor:</b> {course.tutor}</p>
                //                         <p className="focus"><b>Focus:</b> {course.focus}</p>
                //                     </div>
                //                 </div>
                //             ))}
                //         </div>
                //         <div className="pagination">
                //             <button
                //                 onClick={() => setCurrentPage(currentPage - 1)}
                //                 disabled={currentPage === 1}
                //             >
                //                 Previous
                //             </button>
                //             <span>Page {currentPage} of {totalPages(
                //                 modalCategory === 'inProgress' ? inProgressCourses
                //                     : modalCategory === 'pending' ? pendingCourses
                //                         : declinedCourses
                //             )}</span>
                //             <button
                //                 onClick={() => setCurrentPage(currentPage + 1)}
                //                 disabled={currentPage === totalPages(
                //                     modalCategory === 'inProgress' ? inProgressCourses
                //                         : modalCategory === 'pending' ? pendingCourses
                //                             : declinedCourses
                //                 )}
                //             >
                //                 Next
                //             </button>
                //         </div>
                //         <button className="closeButton" onClick={closeModal}>Close</button>
                //     </div>
                // </div>
            )}

            <style jsx>{`
                .coursesContainer {
                    padding: 20px;
                    background-color: #f8f8f8;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: auto auto;
                    gap: 20px;
                }

                .fullLengthCard {
                    display: flex;
                    width: 100%;
                    height: 100px;
                }

                .coursesSection {
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }

                .largeSection {
                    grid-column: span 1;
                }

                .fullSection {
                    grid-column: span 2;
                }

                h2 {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }

                .courseCards {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .courseCardsDeclined {
                    display: flex;
                    flex-direction: row;
                    gap: 20px;
                }

                .courseCard {
                    display: flex;
                    background-color: lightgrey;
                    padding: 10px;
                    border-radius: 10px;
                    flex: 1;
                }

                .profileSection {
                    margin-right: 15px;
                }

                .profileImage {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .courseInfo {
                    flex: 1;
                }

                .studentName,
                .focus,
                .message,
                .reason {
                    margin: 5px 0;
                    font-size: 14px;
                    color: #555;
                }

                .seeMoreButton {
                    background-color: #007bff;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 20px;
                }

                .seeMoreButton:hover {
                    background-color: #0056b3;
                }

                .declinedCards {
                    width: calc(33.33% - 20px);
                }

                .modalOverlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modalContent {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 50%;
                    max-height: 80%;
                    overflow-y: auto;
                }

                .modalCourseCards {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .pagination {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                }

                .closeButton {
                    margin-top: 20px;
                    padding: 10px 15px;
                    background: red;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default StudentMyCoursesPage;
