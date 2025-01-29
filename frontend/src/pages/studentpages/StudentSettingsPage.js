import React, { useState } from 'react';
import '../../styles/StudentSettingsPage.css';
import { getStudentById, getTutorById, updateStudentPassword } from '../../controllers/AccountController';

function StudentSettingsPage(props) {
    const [userData, setUserData] = useState({});
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [major, setMajor] = useState('');
    const [language, setLanguage] = useState('');
    const [notifications, setNotifications] = useState(false);
    const [originalPassword, setOriginalPassword] = useState('');
    const [inputtedPassword, setInputtedPassword] = useState('');

    React.useEffect(() => {
        async function fetchData() {
            if(props.isTutor){
                const latestTutorInfo = await getTutorById(props.user.id);
                setUserData(latestTutorInfo);
                initializeTutorData(latestTutorInfo);
            } else {
                const latestStudentInfo = await getStudentById(props.user.id);
                setUserData(latestStudentInfo);
                console.log("here's thje student log info ",latestStudentInfo);
                initializeStudentData(latestStudentInfo);
            }
        }
        fetchData();
    }, []);

    function initializeTutorData(latestTutorInfo){
        setFullName(latestTutorInfo.tutor.name);
        setEmail(latestTutorInfo.email);
        setBirthday(latestTutorInfo.tutor.birthday);
        setMajor(latestTutorInfo.tutor.major);
        setLanguage(latestTutorInfo.tutor.language);
        setNotifications(latestTutorInfo.notifications);
        setOriginalPassword(latestTutorInfo.password);
    }

    function initializeStudentData(latestStudentInfo){
        setFullName(latestStudentInfo.student.name);
        setEmail(latestStudentInfo.email);
        setBirthday(latestStudentInfo.student.birthday);
        setMajor(latestStudentInfo.student.major);
        setLanguage(latestStudentInfo.student.language);
        setNotifications(latestStudentInfo.notifications);
        setOriginalPassword(latestStudentInfo.password);
    }

    // const [userData, setUserData] = useState({
    //     fullName: 'John Smith',
    //     email: 'user@example.com',
    //     birthday: '',  
    //     major: '',
    //     language: 'English',
    //     notifications: true,
    //     password: '1234'
    // });

    const majors = [
        { value: "computer_science", label: "Computer Science" },
        { value: "engineering", label: "Engineering" },
        { value: "biology", label: "Biology" },
        { value: "business", label: "Business" }
    ];

    const languages = [
        { value: "english", label: "English" },
        { value: "french", label: "French" },
        { value: "spanish", label: "Spanish" },
        { value: "chinese", label: "Chinese" },
        { value: "Arabic", label: "Arabic" },
        { value: "Farsi", label: "Farsi" },
        { value: "Urdu", label: "Urdu" },
        { value: "Hindi", label: "Hindi" }
    ];

    const [passwordInput, setPasswordInput] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "currentPassword" || name === "newPassword") {
            setPasswordInput(prev => ({ ...prev, [name]: value }));
        } else {
            setUserData(prev => ({ ...prev, [name]: value }));
        }
    };

    // const handleToggle = (e) => {
    //     setUserData(prev => ({ ...prev, notifications: !prev.notifications }));
    // };

    const handlePasswordInput = async (e) => {
        const newPassword = e.target.value;
        setInputtedPassword(newPassword);
        // try {
        //     const queriedTutors = await tutorListBasedOnQuery(query);
        //     console.log('Search results based on query:', queriedTutors);
        //     setFilteredTutors(queriedTutors);
        // } catch (error) {
        //     console.error('Error fetching tutors:', error);
        // }
    };

    function changeUserPassword(){
        updateStudentPassword(props.user.id, inputtedPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserData(prev => ({ ...prev, password: passwordInput.newPassword }));
                    setPasswordInput({ currentPassword: '', newPassword: '' });
                    alert('Your information has updated successfully.');


        // if (passwordInput.currentPassword && passwordInput.newPassword) {
        //     if (passwordInput.currentPassword === userData.password) {
        //         if (passwordInput.currentPassword !== passwordInput.newPassword){
        //             setUserData(prev => ({ ...prev, password: passwordInput.newPassword }));
        //             setPasswordInput({ currentPassword: '', newPassword: '' });
        //             alert('Your information has updated successfully.');
        //             console.log('Form Data:', userData);
        //         } else {
        //             alert('Your new password should not be the same as your old password.');
        //         }
        //     } else {
        //         alert('Current password is incorrect.');
        //     }
        // } else {
            
        //     console.log('Form Data:', userData);
        //     alert('Your information has updated successfully.');
        // }
    };

    return (
        <div className="settingsContainer">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <h2>Personal Information</h2>
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={fullName}  disabled/>

                    <label>Email Address</label>
                    <input type="email" name="email" value={email} disabled />

                    <label>Birthday</label>
                    <input type="date" name="birthday" value={birthday} disabled/>

                    {/* <label>Major</label>
                    <select name="major" value={major} onChange={handleChange}>
                        <option value="">Select Major</option>
                        {majors.map(major => <option key={major.value} value={major.value}>{major.label}</option>)}
                    </select>

                    <label>Language</label>
                    <select name="language" value={language} onChange={handleChange}>
                        <option value="">Select Language</option>
                        {languages.map(language => <option key={language.value} value={language.value}>{language.label}</option>)}
                    </select> */}
                </div>

                {/* <div className="section">
                    <h2>Notification Settings</h2>
                    <div className="notification-section">
                        <p>Enable Notifications</p>
                        <div className="toggle-container">
                            <input
                                className="react-switch-checkbox"
                                id="react-switch-new"
                                type="checkbox"
                                checked={notifications}
                                onChange={handleToggle}
                            />
                            <label
                                className="react-switch-label"
                                htmlFor="react-switch-new"
                            >
                                <span className="react-switch-button" />
                            </label>
                        </div>
                    </div>
                </div> */}

                <div className="section">
                    <h2>Password Update</h2>
                    {/* <label>Current Password</label>
                    <input type="password" name="currentPassword" value={passwordInput.currentPassword} onChange={handleChange} /> */}
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={passwordInput.newPassword} onChange={(e) => { handleChange(e); handlePasswordInput(e); }} />
                </div>

                <button type="submit" className="saveButton" onClick={() => changeUserPassword()}>Save Changes</button>
            </form>
        </div>
    );
}

export default StudentSettingsPage;