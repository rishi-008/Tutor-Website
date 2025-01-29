const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/build")));

const accountsFilePath = path.join(__dirname, "../../express/api/accounts.json");
const reportsFilePath = path.join(__dirname, "../../express/api/reports.json");
const sessionsFilePath = path.join(__dirname, "../../express/api/sessions.json");
const resourcesFilePath = path.join(__dirname, "../../express/api/resources.json");
const universityFilePath = path.join(__dirname, "../../express/api/universities.json");

const Tables = Object.freeze({
    ACCOUNTS: accountsFilePath,
    REPORTS: reportsFilePath,
    SESSIONS: sessionsFilePath,
    UNIVERSITIES: universityFilePath,
    RESOURCES: resourcesFilePath
});

// Read data from the JSON file
const readData = (table) => {
    try {
        return JSON.parse(fs.readFileSync(table, "utf8"));
    } catch (err) {
        console.error("Error reading data:", err);
        return [];
    }
};

// Write data to the JSON file
const writeData = (data, table) => {
    try {
        fs.writeFileSync(table, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
};

// Defining routes here
app.get("/api/student/id", (req, res) => {
    const data = readData(Tables.ACCOUNTS);
    let max = 0;
    data.students.forEach(student => {
        max = Math.max(max, student.id);
    });
    res.json(max + 1);
});

app.get("/api/tutor/id", (req, res) => {
    const data = readData(Tables.ACCOUNTS);
    let max = 0;
    data.tutors.forEach(tutor => {
        max = Math.max(max, tutor.id);
    });
    res.json(max + 1);
});

// Get all items for tutor accounts
app.get("/api/tutor", (req, res) => {
    const data = readData(Tables.ACCOUNTS).tutors || [];
    res.json(data);
});

app.get("/api/tutor/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.ACCOUNTS);
    const item = data.tutors.find((item) => item.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Add a new item to tutor accounts
app.post("/api/tutor", (req, res) => {
    const newItem = req.body;
    const data = readData(Tables.ACCOUNTS);
    data.students = data.students || [];
    data.tutors.push(newItem);
    writeData(data, Tables.ACCOUNTS);
    res.status(201).json(newItem);
});

// Delete an account item by ID
app.delete("/api/tutor/:id", (req, res) => {
    const { id } = req.params;
    let data = readData(Tables.ACCOUNTS);
    const initialLength = data.length;
    data = data.filter((item) => item.id !== id);
    if (data.length < initialLength) {
        writeData(data, Tables.ACCOUNTS);
        res.json({ message: `Item with ID ${id} deleted` });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Get all items for student accounts
app.get("/api/student", (req, res) => {
    const data = readData(Tables.ACCOUNTS);
    res.json(data.students || []);
});

app.get("/api/student/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.ACCOUNTS);
    const item = data.students.find((item) => item.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Add a new item to student accounts
app.post("/api/student", (req, res) => {
    const newItem = req.body;
    const data = readData(Tables.ACCOUNTS);
    data.students = data.students || [];
    data.students.push(newItem);
    writeData(data, Tables.ACCOUNTS);
    res.status(201).json(newItem);
});

// Delete a student account item by ID
app.delete("/api/student/:id", (req, res) => {
    const { id } = req.params;
    let data = readData(Tables.ACCOUNTS);
    const initialLength = data.students.length;
    data.students = data.students.filter((item) => item.id !== id);
    if (data.students.length < initialLength) {
        writeData(data, Tables.ACCOUNTS);
        res.json({ message: `Item with ID ${id} deleted` });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.delete("/api/student/:id/notification/:nid", (req, res) => {
    const { id, nid } = req.params;
    let data = readData(Tables.ACCOUNTS);
    const initialLength = data.students.length;
    const student = data.students.find((item) => item.id == id);
    student.notifications = data.students.notifications.filter((item) => item.id !== nid);
    data.students = data.students.filter((item) => item.id !== id);
    data.students.push(student);
    if (data.students.length < initialLength) {
        writeData(data, Tables.ACCOUNTS);
        res.json({ message: `Item with ID ${id} deleted` });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.put("/api/tutor/description/:id", (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const data = readData(Tables.ACCOUNTS);
    const item = data.tutors.find((item) => item.id == id);
    const updatedTutors = data.tutors.filter((item) => item.id != id);
    item.tutor.description = description;
    updatedTutors.push(item);
    data.tutors = updatedTutors;
    writeData(data, Tables.ACCOUNTS);
    res.json(item);
});

app.put("/api/student/password/:id", (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const data = readData(Tables.ACCOUNTS);
    const item = data.students.find((item) => item.id == id);
    const updatedStudents = data.students.filter((item) => item.id != id);
    item.password = password;
    updatedStudents.push(item);
    data.students = updatedStudents;
    writeData(data, Tables.ACCOUNTS);
    res.json(item);
});

app.put("/api/tutor/rating/:id", (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const data = readData(Tables.ACCOUNTS);
    const item = data.tutors.find((item) => item.id == id);
    if (item) {
        item.rating = rating;
        writeData(data, Tables.ACCOUNTS);
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.put("/api/tutor/courses/:id", (req, res) => {
    const { id } = req.params;
    const { courses } = req.body;
    console.log("this is the courses in the data layer", courses);
    const data = readData(Tables.ACCOUNTS);
    const item = data.tutors.find((item) => item.id == id);
    if (item) {
        const updatedTutors = data.tutors.filter((item) => item.id != id);
        item.courses = item.courses || [];
        for(let i = 0; i < courses.length; i++) {
            item.tutor.courses.push(courses[i]);
        };
        updatedTutors.push(item);
        data.tutors = updatedTutors;
        writeData(data, Tables.ACCOUNTS);
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

//TABLE UNIVERSITY

app.get("/api/university", (req, res) => {
    const data = readData(Tables.UNIVERSITIES);
    res.json(data);
});

app.get("/api/university/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.UNIVERSITIES);
    const item = data.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

//SESSIONS

app.get("/api/session", (req, res) => {
    const data = readData(Tables.SESSIONS);
    if (data) {
        writeResources();
        res.json(data.sessions);
    }
});

app.get("/api/session/id", (req, res) => {
    const data = readData(Tables.SESSIONS);
    let max = 0;
    data.sessions.forEach(session => {
        max = Math.max(max, session.id);
    });
    res.json(max + 1);
});

app.get("/api/session/active/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "active" && item.student === name);
    res.json(items);
});

app.get("/api/session/tutor/active/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "active" && item.tutor === name);
    res.json(items);
});

app.get("/api/session/pending/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "pending" && item.student === name);
    res.json(items);
});

app.get("/api/session/tutor/pending/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "pending" && item.tutor === name);
    res.json(items);
});

app.get("/api/session/canceled/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "declined" && item.student === name);
    res.json(items);
});

app.get("/api/session/tutor/canceled/:name", (req, res) => {
    const { name } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.status === "declined" && item.tutor === name);
    res.json(items);
});

app.get("/api/session/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.SESSIONS);
    const item = data.sessions.find((item) => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.delete("/api/session/:id", (req, res) => {
    const { id } = req.params;
    let data = readData(Tables.SESSIONS);
    const initialLength = data.sessions.length;
    data.sessions = data.sessions.filter((item) => item.id !== id);
    if (data.sessions.length < initialLength) {
        writeData(data, Tables.SESSIONS);
        res.json({ message: `Item with ID ${id} deleted` });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get("/api/session/tutor/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.tutorId === id);
    if (items) {
        res.json(items);
    } else {
        res.status(404).json({ message: "Tutor's courses not found" });
    }
});

app.get("/api/session/student/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.SESSIONS);
    const items = data.sessions.filter((item) => item.studentId === id);
    if (items) {
        res.json(items);
    } else {
        res.status(404).json({ message: "Student's courses not found" });
    }
});

app.get("/api/session/chat/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.SESSIONS);
    const item = data.sessions.find((item) => item.id == id);
    if (item) {
        res.json(item.chatMessages);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.post("/api/session/chat/:id", (req, res) => {
    const { id } = req.params;
    const { sender, message } = req.body;
    const data = readData(Tables.SESSIONS);
    const item = data.sessions.find((item) => item.id == id);
    if (item) {
        item.chatMessages.push({ sender, message });
        writeData(data, Tables.SESSIONS);
        res.json(item.chatMessages);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.post("/api/session", (req, res) => {
    const newItem = req.body;
    const data = readData(Tables.SESSIONS);
    const sessions = data.sessions;
    const existingSession = sessions.find(session =>
        session.status === "pending" &&
        session.student === newItem.student &&
        session.tutor === newItem.tutor
    );

    if (existingSession) {
        res.status(400).json({ message: "A pending session already exists between this student and tutor." });
    } else {
        sessions.push(newItem);
        writeData(data, Tables.SESSIONS);
        res.status(201).json(newItem);
    }
});

app.post("/api/session/update/:id", (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const data = readData(Tables.SESSIONS);
    const item = data.sessions.find((item) => item.id == id);
    if (item) {
        let index = data.sessions.findIndex((session) => session.id == id);
        data.sessions[index] = updatedItem;
        writeData(data, Tables.SESSIONS);
        res.json(updatedItem);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get("/api/reports/:id", (req, res) => {
    const { id } = req.params;
    const data = readData(Tables.REPORTS);
    const item = data.reports.find((item) => item.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get("/api/reports/:tutorId", (req, res) => {
    const { tutorId } = req.params;
    const data = readData(Tables.REPORTS);
    const items = data.reports.filter((item) => item.tutorId == tutorId);
    if (items) {
        res.json(items);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.post("/api/reports", (req, res) => {
    const newItem = req.body;
    const data = readData(Tables.REPORTS);
    data.reports.push(newItem);
    writeData(data, Tables.REPORTS);
    res.status(201).json(newItem);
});

// serve react app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

// Remove the server start line for Netlify Functions
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

function getResourcesFromId(id) {
    const data = readData(Tables.RESOURCES);
    const resource = data.resources.find(resource => resource.id === id);
    return resource.name;
}

function writeResources() {
    const data = readData(Tables.SESSIONS);
    data.sessions.forEach(session => {
        if (session.resources) {
            session.resources = session.resources.map(resource =>
                typeof resource === 'number' ? getResourcesFromId(resource) : resource
            );
        }
    });
    writeData(data, Tables.SESSIONS);
}

module.exports.handler = serverless(app);
