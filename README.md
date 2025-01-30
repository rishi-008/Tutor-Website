# Tutor Website

## Live Project
- **Deployed Website:** [Click Here](https://sprightly-kitten-69d268.netlify.app)
- **Project Live Demo:** [YouTube Video](https://www.youtube.com/watch?v=z4kNH7HaTiQ)

## Project Overview
My team of five and I worked on this Tutoring Website which is designed to provide an intuitive and efficient platform for online tutoring. Currently, while both frontend and backend have been fully deployed using **Netlify**, the backend is in progress of being fixed on the deployed website, since I'm utilizing **Netlify Functions** but am facing some challenges in implementation.

This is a **full-stack application** built using **React for the frontend** and a **local version of Express for backend logic**, where JSON files serve as the data source instead of a web server. My team and I, consisting of **five members**, implemented various **API routes** to handle operations such as creating and retrieving data. Below is an example of how we manage reports:

```javascript
app.post("/api/reports", (req, res) => {
    const newItem = req.body;
    const data = readData(Tables.REPORTS);
    data.reports.push(newItem);
    writeData(data, Tables.REPORTS);
    res.status(201).json(newItem);
});
```

Additionally, we structured our frontend with **controller classes**, ensuring a clean separation of concerns. Here is an example of how we fetch student data:

```javascript
const getStudentById = async (id) => {
    const response = await fetch(`/api/student/${id}`);
    const data = await response.json();
    return data;
};
```

> **Note:** The website is currently frontend-only as backend functionality is under development. Ongoing efforts are being made to integrate backend services to achieve full functionality.

## Architectural Structure
The application follows a hybrid **Client-Server** model while incorporating elements of **Model-View-Controller (MVC)** and **Layered Architecture** to ensure modularity, scalability, and maintainability.

## Screenshots of Major Screens
Below are some key screenshots showcasing the interface and functionality:

![Screenshot 1](https://github.com/user-attachments/assets/d16410c3-7efd-4287-b5d6-1c4dcdc2ec34)
![Screenshot 2](https://github.com/user-attachments/assets/7a5e94b7-7318-4b9e-9461-1a3bee50c55b)
![Screenshot 3](https://github.com/user-attachments/assets/bda2fedd-46ce-4f0b-bd68-db1d2ae1a523)
![Screenshot 4](https://github.com/user-attachments/assets/e2c74cb9-ae4e-41bf-87f1-195a4511e9fd)
![Screenshot 5](https://github.com/user-attachments/assets/1676db7b-77c2-400a-9b65-055494dba09a)
![Screenshot 6](https://github.com/user-attachments/assets/4971e584-a384-4289-a916-f1fb320772ff)
![Screenshot 7](https://github.com/user-attachments/assets/42bdacab-4c28-483e-ae20-3e54794c9e71)
![Screenshot 8](https://github.com/user-attachments/assets/36b1e41b-dcb6-4539-b668-c236478e28db)
![Screenshot 9](https://github.com/user-attachments/assets/f581542d-bade-45b0-aa72-d18d860f5a58)

## Next Steps
- **Backend Development:** Continue working on Netlify Functions to integrate backend functionality in the deployed website.
- **Database Integration:** Establish a robust database connection for user and session management.
- **Performance Optimization:** Enhance loading speeds and optimize API calls.

This project demonstrates a structured approach to building an online tutoring platform, emphasizing modular architecture and scalability. 

