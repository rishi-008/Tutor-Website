
// This component is a sub-component of the StudentDashboard component. It is used to display the overview of a course that the student has accepted. It displays the course name, the student's name, the resources for the course, the chat history for the course, and the link to the online platform where the student and tutor meeting will take place.
import React from "react";
import { Link } from "react-router-dom";

// Adding a JSDoc comment to the AcceptedCourseOverview component to explain its parameters, what it returns, and how to use it.
/**
 * @param {boolean} studentProfilePhotoExists - A boolean indicating if the student's profile photo exists.
 * @param {string} studentProfilePhotoHref - The URL to the student's profile photo.
 * @param {string} courseName - The name of the course. This won't be displayed on the course overview button, but it will be displayed on the course overview page hence information is kept here to be transferred shortly later.
 * @param {string} studentInCourseName - The name of the student taking the course. This won't be displayed on the course overview button, but it will be displayed on the course overview page hence information is kept here to be transferred shortly later.
 * @param {string[]} courseResources - This'll hold a list of resources (different file types via storing the location of the files) for a particular course. This is an array of strings representing the locations of the resources.
 * @param {Array.<Array.<string>>} courseChat - This'll hold a history of all the previous conversation between the tutor and student for a particular course. Each element is an array with three elements: the message (string), the name of the person who sent it (string), and the timing info (string).
 * @param {string} courseLink - The link to the online platform where the student and tutor meeting will take place. This won't be displayed on the course overview button, but it will be displayed on the course overview page hence information is kept here to be transferred shortly later.
 * @returns {JSX.Element} - A AcceptedCourseOverview component
 *
 * @description - A AcceptedCourseOverview component
 *
 * @example
 * <AcceptedCourseOverview
 *  studentProfilePhotoExists={true}
 *  studentProfilePhotoHref="/cps731-frontend/frontend/src/assets/profile.jpg"
 *  courseName="Algorithms"
 *  studentInCourseName="Bob"
 *  courseResources={["resource1.pdf", "resource2.pdf"]}
 *  courseChat={[["Hello", "Bob", "10:00 AM"], ["How are you?", "Tutor", "10:01 AM"]]}
 *  courseLink="https://example.com"
 * />
 */

const AcceptedCourseOverview = ({ studentProfilePhotoExists, studentProfilePhotoHref, courseName, studentInCourseName, courseResources, courseChat, courseLink }) => {
  return 
  <>
    <div className="course-overview-wrapper">

    
    </div>
    <style jsx>
        {`

        `}
    </style>
  </>
}