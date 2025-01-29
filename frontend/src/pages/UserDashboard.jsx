import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentExplorePage from './studentpages/StudentExplorePage';
import StudentMyCoursesPage from './studentpages/StudentMyCoursesPage';
import TutorMyCoursesPage from './tutorpages/TutorMyCoursesPage';
import StudentCoursePage from './studentpages/StudentCoursePage';
import StudentNotificationsPage from './studentpages/StudentNotificationsPage';
import StudentSettingsPage from './studentpages/StudentSettingsPage';
import TutorProfilePage from './tutorpages/TutorProfilePageEditable';
import '../styles/UserDashboard.css';
import { getNotifications } from '../controllers/AccountController';
import { getActiveSessions, getCanceledSessions, getPendingSessions } from '../controllers/SessionController';

function UserDashboard() {
    const [selectedContent, setSelectedContent] = useState('explore');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [declinedCourses, setDeclinedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [inProgressCourses, setInProgressCourses] = useState([]);

    const testUser = {
        "id": 0,
        "password": "test",
        "email": "student@example.com",
        "student": {
            "name": "John Doe",
            "age": 20,
            "major": "Computer Science",
            "birthday": "",
            "language": "english"
        },
        "isAdmin": false,
        "notifications": [
            {
                "id": 1,
                "message": "Urgent: Tutor has dropped your connection request.",
                "category": "urgent"
            },
            {
                "id": 2,
                "message": "You have a new connection request from Tutor A.",
                "category": "unread"
            },
            {
                "id": 3,
                "message": "Your session with Tutor B has been scheduled.",
                "category": "read"
            },
            {
                "id": 4,
                "message": "Urgent: Tutor C accepted your connection request.",
                "category": "urgent"
            },
            {
                "id": 5,
                "message": "Reminder: Your next session with Tutor D is in 2 hours.",
                "category": "unread"
            },
            {
                "id": 6,
                "message": "You have successfully completed your session with Tutor E.",
                "category": "read"
            }
        ],
        "proofdoc": null,
        "isApproved": true
    };

    const location = useLocation();
    const user = location.state?.user || testUser;
    const isTutor = location.state?.isTutor;
    console.log('User: ', user);

    React.useEffect(() => {
        async function fetchData() {
            const active = await getActiveSessions(user.student.name);
            const canceled = await getCanceledSessions(user.student.name);
            const pending = await getPendingSessions(user.student.name);
            const n = await getNotifications(user.id, isTutor);
            setDeclinedCourses(canceled);
            setPendingCourses(pending);
            setInProgressCourses(active);
            setNotifications(n);
        }
        fetchData();
    }, []);


    const onCourseSelect = (course) => {
        setSelectedCourse(course);
        setSelectedContent('course');
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const renderContent = () => {
        console.log("this is the user tt", user.id);
        // If we want this side bar to appear on the left side of the screen for something like the tutor profile page or the tutor search page based on the searched item then we can probably just update the value given to selectedContent to be that of the tutopr pafge (add another case to the switch statement) or whatever page. W#e'll just need to make it so we update the state or whatever somehow
        switch (selectedContent) {
            case 'explore':
                return <StudentExplorePage user={user} />;
            case 'notifications':
                return <StudentNotificationsPage notifications={notifications} />;
            case 'myCourses':
                return <StudentMyCoursesPage setSelectedContent={setSelectedContent} setSelectedCourse={setSelectedCourse} inProgressCourses={inProgressCourses} pendingCourses={pendingCourses} declinedCourses={declinedCourses} />;
            case 'course':
                return <StudentCoursePage course={selectedCourse} setSelectedContent={setSelectedContent} />;
            case 'settings':
                return <StudentSettingsPage user={user} isTutor={isTutor}/>;
            case 'profile':
                return <TutorProfilePage />;
            default:
                return <div>Welcome</div>;
        }
    };

    return (
        <div className="container">
            <tutorProfilePage />
            <Sidebar onSelect={setSelectedContent} toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen} courses={inProgressCourses} onCourseSelect={onCourseSelect} isTutor={isTutor} />
            <main className="dashboardContent">
                {renderContent()}
            </main>
        </div>
    );
}

export default UserDashboard;
