import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TutorCard from '../../components/TutorCard';
import { tutorListBasedOnQuery } from "../../controllers/AccountController";

function TutorSearchPage() {
    const location = useLocation();
    const user = location.state.user;
    // Safely retrieve the state and fallback to an empty array if undefined
    const tutors = (location.state && location.state.searchQueryResult) || [{name: 'John Doe', profilePicture: '', description: 'Expert in Math' }];
    const searchedQuery = (location.state && location.state.searchedQuery) || '';
    console.log('Received tutors:', tutors);

    const [searchQuery, setSearchQuery] = useState(searchedQuery);
    const [filteredTutors, setFilteredTutors] = useState(tutors);

    // Handle search input change
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        try {
            const queriedTutors = await tutorListBasedOnQuery(query);
            console.log('Search results based on query:', queriedTutors);
            setFilteredTutors(queriedTutors);
        } catch (error) {
            console.error('Error fetching tutors:', error);
        }
    };

    return (
        <div className="tutorSearchPage">
            <div className="header">
                <button className="backButton">
                    &larr; 
                </button>
            </div>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search for a tutor..."
                    //value={searchQuery}
                    onChange={handleSearch}
                    className="searchInput"
                />
                {/* <button className="searchIcon">Search</button> */}
            </div>

            <h1>Search Results for {searchQuery}</h1>
            {/* Tutor List */}
            <div className="tutorList">
                {console.log("this is the filtered tutor list", filteredTutors)}
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor, index) => (
                        console.log("this is the tutor info being passed ",tutor),
                        <TutorCard key={index} tutor={tutor} user={user}/>
                    ))
                ) : (
                    <p>No tutors found.</p>
                )}
            </div>

            <style jsx>{`
                .header{
                    display: flex;
                    justify-content: start;
                    gap: 50rem;
                    background: none;
                }
                .backButton {
                    font-size: 1.5rem;
                    border: none;
                    background: none;
                    cursor: pointer;
                }
                .tutorSearchPage {
                    font-family: Arial, sans-serif;
                }

                h1 {
                    text-align: left;
                    margin-bottom: 20px;
                }

                .searchBar {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .searchInput {
                    width: 100%;
                    max-width: 600px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                }

                .tutorList {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .tutorCard {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: none;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    width: calc(33.333% - 20px);
                }

                .tutorImage {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin-bottom: 15px;
                }

                .tutorDetails h3 {
                    margin: 0;
                    font-size: 18px;
                }

                .tutorDetails p {
                    font-size: 14px;
                    color: #555;
                }
            `}</style>
        </div>
    );
}

export default TutorSearchPage;
