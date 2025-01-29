import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserDashboard.css';

function Sidebar({ onSelect, toggleDropdown, isDropdownOpen, courses, onCourseSelect, isTutor }) {

    const handleMyCoursesClick = () => {
        onSelect('myCourses');  
        toggleDropdown();  
    };

    return (
        <aside className="sidePanel">
            <div className="profileImageContainer">
                <img src="profile.jpg" alt="Profile" className="profileImage" />
                {/* <div className="statusIndicator"></div> */}
            </div>
            <div className="ButtonsContainer">
                <div className="ButtonsGroup">
                    {isTutor ? (
                        <div className="sideButton" onClick={() => onSelect('profile')}>Profile</div>
                    ) : (
                        <div className="sideButton" onClick={() => onSelect('explore')}>Explore</div>
                    )}
                    <div className="sideButton" onClick={() => onSelect('notifications')}>Notifications</div>
                    <div className="sideButton">
                        <button className="sideButton" onClick={handleMyCoursesClick}>
                            My Courses {isDropdownOpen ? '▼' : '▶'} 
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdownMenu">
                                {courses.map(course => (
                                    <div key={course.id} className="dropdownItem" onClick={() => onCourseSelect(course)}>
                                        {course.focus}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="ButtonsGroup">
                    <div className="sideButton" onClick={() => onSelect('settings')}>Settings</div>
                    <Link to="/" className="sideButton">Logout</Link>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
