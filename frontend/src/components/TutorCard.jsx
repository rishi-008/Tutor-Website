import { Link } from 'react-router-dom';

const TutorCard = (props) => {
    const tutorData = props.tutor;
    const tutor = tutorData.tutor;
    console.log(tutorData);
    const user = props.user || null;
    return (
        <>
            <Link to="/tutorProfile" state={{ tutor: tutorData, user: user }}>
                <div className="tutor-card">
                    <div className="profile-pic-container">
                        <img className="profile-pic" src="https://tutorax.com/wp-content/uploads/2021/11/Orthopedagogue-rencontre-orthopedagogie.jpg" alt="Profile Pic" />
                        <h3 className="tutor-name">{tutor.name}</h3>
                        <div className="rating">
                            ⭐{tutor.rating}/5
                        </div>
                    </div>
                    <div className="course-details">
                        <span>{tutor.education}</span>
                        <span>${tutor.costPerHour}/hr</span>
                    </div>
                </div>
            </Link>
            <style jsx="true">
                {`  
                    .tutor-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border: 1px solid #ccc;
                        padding: 16px;
                        width: 300px;
                        height: 45vh;
                        margin: 16px;
                        background-color: #fff;
                    }
                    .tutor-name {
                        position: absolute;
                        top: 90%;
                        padding-left: 10px;
                        color: #000;
                        background-color: rgba(255, 255, 255, 0.7);
                        padding: 4px 8px;
                    }
                    .course-details {
                        margin-top: 16px;
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        color: #000;
                    }
                    .profile-pic {
                        height: 100%;
                    }
                    .profile-pic-container {
                        height: 80%;
                        position: relative;
                    }
                `}
            </style>
        </>
    );
};

export default TutorCard;