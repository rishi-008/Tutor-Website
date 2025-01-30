import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import TutorCard from '../components/TutorCard';
import { getTutors } from '../../netlify/functions/controllers/AccountController';
import { useNavigate } from "react-router-dom";
import {tutorListBasedOnQuery} from '../../netlify/functions/controllers/AccountController';

function HomePage() {

  const navigate = useNavigate();
  const [queriedTutors, setQueriedTutors] = React.useState([]);
  const [searchedQuery, setSearchedQuery] = React.useState([]);
  const [tutors, setTutors] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const tutors = await getTutors();
      setTutors(tutors);
    }
    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <header className="header">
    <h1>Blue Zelephant</h1>
    <div className="header-buttons">
      <Link to="/login" className="button">Login</Link>
      <Link to="/register" className="button">Try for Free</Link>
      {/* <Link to="/userPortal" className="button">Test User Portal</Link> */}
    </div>
  </header>
  <div className="banner">
    <h2>Be the change you want to see in yourself. Blue Zelephant.</h2>
  </div>
  <div className="features">
    <div className="feature-item">
      <div className="feature-icon">🤸</div>
      <h3>Flexibility</h3>
      <p>Find a tutor that suits your learning needs.</p>
    </div>
    <div className="feature-item">
      <div className="feature-icon">🧐</div>
      <h3>Reliability</h3>
      <p>Our tutors are verified experts.</p>
    </div>
    <div className="feature-item">
      <div className="feature-icon">⚖️</div>
      <h3>Balance</h3>
      <p>Academia shouldn't be scary. Enjoy learning, and enjoy your life. </p>
    </div>
  </div>
  <div className="course-search">
    <h3>Get course help now:</h3>
    <input
      type="text"
      onChange={async (e) => {
        const searchQuery = e.target.value;
        setSearchedQuery(searchQuery);
        const queriedTutors = await tutorListBasedOnQuery(searchQuery);
        setQueriedTutors(queriedTutors);
      }}
      placeholder="Search for courses or tutors..."
      className="search-input"
    />
    <button type="button" className="search-btn"
    onClick={() =>
      navigate("/tutorsearch", { state: { searchQueryResult: queriedTutors, searchedQuery: searchedQuery} })
    }
    >Search</button>
  </div>
  <div className="tutor-list">
      <h3 className="tutor-list-title">Our Vetted List of Elite Tutors</h3>
      <div className="tutors">
        {tutors.slice(0, 3).map((tutor, key) => (
          <TutorCard key={key} tutor={tutor} />
        ))}
      </div>
    </div>
      {/* <Header /> */}
      {/* <Banner /> */}
      {/* <Features /> */}
      {/* <CourseSearch /> */}
      {/* <TutorList /> */}
    </div>
  );
}

// const Header = () => (
//   <header className="header">
//     <h1>Blue Zelephant</h1>
//     <div className="header-buttons">
//       <Link to="/login" className="button">Login</Link>
//       <Link to="/register" className="button">Try for Free</Link>
//       <Link to="/userPortal" className="button">Test User Portal</Link>
//     </div>
//   </header>
// );

// const Banner = () => (
//   <div className="banner">
//     <h2>Be the change you want to see in yourself. Blue Zelephant.</h2>
//   </div>
// );

// const Features = () => (
//   <div className="features">
//     <div className="feature-item">
//       <div className="feature-icon">🤸</div>
//       <h3>Flexibility</h3>
//       <p>Find a tutor that suits your learning needs.</p>
//     </div>
//     <div className="feature-item">
//       <div className="feature-icon">🧐</div>
//       <h3>Reliability</h3>
//       <p>Our tutors are verified experts.</p>
//     </div>
//     <div className="feature-item">
//       <div className="feature-icon">⚖️</div>
//       <h3>Balance</h3>
//       <p>Academia shouldn't be scary. Enjoy learning, and enjoy your life. </p>
//     </div>
//   </div>
// );

// const CourseSearch = () => (
//   <div className="course-search">
//     <h3>Get course help now:</h3>
//     <input
//       type="text"
//       placeholder="Search for courses or tutors..."
//       className="search-input"
//     />
//     <button type="button" className="search-btn"
//     onClick={() =>
//       navigate("/tutorsearch", { state: { searchQueryResult: queriedTutors, searchedQuery: searchedQuery, user: user } })
//     }
//     >Search</button>
//   </div>
// );


// const TutorList = () => {
//   const [tutors, setTutors] = React.useState([]);

//   React.useEffect(() => {
//     async function fetchData() {
//       const tutors = await getTutors();
//       setTutors(tutors);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="tutor-list">
//       <h3 className="tutor-list-title">Our Vetted List of Elite Tutors</h3>
//       <div className="tutors">
//         {tutors.slice(0, 3).map((tutor, key) => (
//           <TutorCard key={key} tutor={tutor} />
//         ))}
//       </div>
//     </div>
//   );
// };


export default HomePage;

