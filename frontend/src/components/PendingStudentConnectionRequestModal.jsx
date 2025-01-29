import React from "react";
import {
    calculateTotalPages,
    displayCoursesBasedOnPageNumberOnModal,
} from "../utils/PendingStudentConnectionRequestUtils";

function PendingStudentConnectionRequestModal({ courses, currentPage, itemsPerPage, setCurrentPage, onClose }) {
        console.log("These are the props that pending student connection request modal is receiving", { courses, currentPage, itemsPerPage, setCurrentPage, onClose });
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <div className="modalCourseCards">
                    {displayCoursesBasedOnPageNumberOnModal(
                        courses,
                        currentPage,
                        itemsPerPage
                    ).map((course) => (
                        <div key={course.id} className="courseCard fullLengthCard">
                            <div className="profileSection">
                                <img
                                    src={course.profilePicture}
                                    alt="Profile"
                                    className="profileImage"
                                />
                            </div>
                            <div className="courseInfo">
                                <p className="studentName">
                                    <b>Student:</b> {course.studentName}
                                </p>
                                <p className="focus">
                                    <b>Focus:</b> {course.focus}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {calculateTotalPages(courses, itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === calculateTotalPages(courses, itemsPerPage)}
                    >
                        Next
                    </button>
                </div>
                <button className="closeButton" onClick={() => { onClose(); setCurrentPage(1); }}>
                    Close
                </button>
            </div>
        </div>
    );
}
export default PendingStudentConnectionRequestModal;
