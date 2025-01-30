import accounts from './mock/mockAccountData';

// const students = accounts.students;
// const tutors = mockaccounts.tutors;

const getStudents = async () => {
    const response = await fetch('/api/student');
    const data = await response.json();
    return data;
};

const getStudentById = async (id) => {
    const response = await fetch(`/api/student/${id}`);
    const data = await response.json();
    return data;
};


// const getTutors = async () => {
//     const response = await fetch('/api/tutor');
//     const data = await response.json();
//     return data;
// }

const getTutors = async () => {
    const response = await fetch('/.netlify/functions/account/api/tutor');
    const data = await response.json();
    return data;
};

const getTutorById = async (id) => {
    const response = await fetch(`/api/tutor/${id}`);
    const data = await response.json();
    console.log("This is the tutor data ",data);
    return data;
}

const _loginTutor = async (email, password) => {
    let tt;
    await fetch('/api/tutor').then(res => res.json()).then(data => {
        tt = data.find(tutor => tutor.email === email);
    });
    if (tt) {
        if (password === tt.password) {
            return tt;
        } else {
            throw new Error('Invalid password');
        }
    }
}

const _loginStudent = async (email, password) => {
    let st;
    await fetch('/api/student').then(res => res.json()).then(data => {
        st = data.find(student => student.email === email);
    });
    if (st) {
        if (password === st.password) {
            return st;
        } else {
            throw new Error('Invalid password');
        }
    }
}

const loginAccount = async (email, password) => {
    try {
        const tutor = await _loginTutor(email, password);
        if (tutor) {
            return tutor;
        }
    } catch (e) {
        console.error(e);
    }
    try {
        const student = await _loginStudent(email, password);
        if (student) {
            return student;
        }
    } catch (e) {
        console.error(e);
    }
    return null;
}

const fileBinUpload = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = `https://filebin.net/2l29ognrfwoiiszo/${file.name}`;
    // const fileres = await fetch(url, {
    //     method: 'POST',
    //     body: file
    // });
    return url;
}

const getFile = async (url) => {
    const rest = await fetch(url);
    const data = await rest.json();
    return data;
}

const registerTutor = async (tutor) => {
    let tt;
    const id = await (fetch('/api/tutor/id'));
    tutor.id = await id.json();
    const res = await fetch('/api/tutor');
    const data = await res.json();
    const url = await fileBinUpload(tutor.proofdoc, tutor.id);
    tutor.proofdoc = url;
    tt = data.find(t => t.email === tutor.email);
    if (tt) {
        throw new Error('Email already exists');
    } else {
        await fetch('/api/tutor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutor)
        });
    }
}

const registerStudent = async (student) => {
    let st;
    const id = await (fetch('/api/student/id'));
    student.id = await id.json();
    const res = await fetch('/api/student');
    const data = await res.json();
    console.log(data);
    st = data.find(s => s.email === student.email);
    if (st) {
        throw new Error('Email already exists');
    } else {
        await fetch('/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
    }
}

const getNotifications = async (id, isTutor) => {
    let acc;
    if (isTutor) {
        const res = await fetch(`/api/tutor/${id}`);
        acc = await res.json();
    }
    else {
        const res = await fetch(`/api/student/${id}`);
        acc = await res.json();
    }
    if (acc.notifications) {
        return acc.notifications;
    }
}

const tutorListBasedOnQuery = async (query) => {
    // console.log("we're getting this query", query);
    let acc;
    const res = await fetch('/api/tutor');
    acc = await res.json();
    const filteredTutors = [];

    for (const tutor of acc) {
        const tutorDetails = await fetch(`/api/tutor/${tutor.id}`);
        const tutorData = await tutorDetails.json();
        // console.log("this is the tutor data", tutorData);
        if (Array.isArray(tutorData.tutor.courses) && tutorData.tutor.courses.includes(query)) {
            filteredTutors.push(tutorData);
        }
    }

    // console.log("this is the filtered list", filteredTutors);
    return filteredTutors;
}

    const updateTutorDescription = async (id, description) => {
        const response = await fetch(`/api/tutor/description/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });
        
        console.log("Does it get here?");
        if (!response.ok) {
            throw new Error('Failed to update tutor description');
        }

        const updatedTutor = await response.json();
        console.log("This is the updated tutor test", updatedTutor);
        return updatedTutor;
    }

    const updateStudentPassword = async (id, password) => {
        const response = await fetch(`/api/student/password/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        
        console.log("Does it get here?");
        if (!response.ok) {
            throw new Error('Failed to update student password');
        }

        const updatedStudent = await response.json();
        console.log("This is the updated tutor test", updatedStudent);
        return updatedStudent;
    }

    const updateTutorCourses = async (id, courses) => {
        const response = await fetch(`/api/tutor/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courses })
        });
        
        console.log("Does it get here?");
        if (!response.ok) {
            throw new Error('Failed to update tutor description');
        }

        const updatedTutor = await response.json();
        console.log("This is the updated tutor test", updatedTutor);
        return updatedTutor;
    }

export {
    getStudents,
    getStudentById,
    getTutorById,
    getTutors,
    loginAccount,
    registerTutor,
    registerStudent,
    getNotifications,
    tutorListBasedOnQuery,
    updateTutorDescription,
    updateTutorCourses,
    updateStudentPassword
};