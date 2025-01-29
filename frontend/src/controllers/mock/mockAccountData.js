let mockAccountData = {
    students: [
        {
            id: 1,
            username: 'student1',
            password: 'hashed_password_1',
            salt: 'salt_1',
            email: 'student1@example.com'
        },
        {
            id: 2,
            username: 'student2',
            password: 'hashed_password_2',
            salt: 'salt_2',
            email: 'student2@example.com'
        }
    ],
    tutors: [
        {
            id: 1,
            username: 'tutor1',
            password: 'hashed_password_3',
            salt: 'salt_3',
            email: 'tutor1@example.com'
        },
        {
            id: 2,
            username: 'tutor2',
            password: 'hashed_password_4',
            salt: 'salt_4',
            email: 'tutor2@example.com'
        }
    ]
};


export default mockAccountData;