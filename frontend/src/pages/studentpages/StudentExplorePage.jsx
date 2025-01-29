import React from "react";
import TutorCard from "../../components/TutorCard";
import { useNavigate } from "react-router-dom";
import { getTutors } from "../../controllers/AccountController";
import { tutorListBasedOnQuery } from "../../controllers/AccountController";
function StudentExplorePage(props) {
  const [tutors, setTutors] = React.useState([]);
  const [queriedTutors, setQueriedTutors] = React.useState([]);
  const [searchedQuery, setSearchedQuery] = React.useState([]);
  const navigate = useNavigate();
  const user = props.user;
  React.useEffect(() => {
    async function fetchData() {
      const tutors = await getTutors();
    //   const sortedTutors = tutors.sort(
    //     (a, b) => b.tutor.rating - a.tutor.rating
    //   );
      setTutors(tutors);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="navbar">
          {/* using useNavigation is aparantly more syntactically correct  */}
          <input
            type="text"
            placeholder="Search Tutors"
            onChange={async (e) => {
              const searchQuery = e.target.value;
              setSearchedQuery(searchQuery);
              const queriedTutors = await tutorListBasedOnQuery(searchQuery);
              setQueriedTutors(queriedTutors);
            }}
          />
          <button
            onClick={() =>
              navigate("/tutorsearch", { state: { searchQueryResult: queriedTutors, searchedQuery: searchedQuery, user: user } })
            }
          >
            Go to Tutor Search
          </button>
        </div>
        <h1>Top Tutors</h1>
        <div className="Tutor-List">
          {tutors.map((tutor, index) => (
            // Mock data for tutors. Change the values with appropriate tutor data.
            <TutorCard key={index} tutor={tutor} user={user} />
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .navbar {
            display: flex;
            gap: 10px;
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            box-sizing: border-box;
          }
          button {
            background-color: black;
            color: white;
            border: none;
            cursor: pointer;
            width: 60px;
          }
          .Tutor-List {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
          }
        `}
      </style>
    </>
  );
}

export default StudentExplorePage;
