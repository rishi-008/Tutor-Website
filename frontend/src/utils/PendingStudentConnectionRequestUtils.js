function calculateTotalPages(courses, itemsPerPage){
    Math.ceil(courses.length / itemsPerPage)
}

function displayCoursesBasedOnPageNumberOnModal(courses, currentUserPage, coursesPerPageAllowed) {
    const firstCourseOfCurrentPage = (currentUserPage - 1) * coursesPerPageAllowed;
    return courses.slice(firstCourseOfCurrentPage, firstCourseOfCurrentPage + coursesPerPageAllowed);
};

export {
    calculateTotalPages,
    displayCoursesBasedOnPageNumberOnModal
}