import SessionBuilder from './models/SessionBuilder.js';

const getActiveSessions = async (name) => {
    const response = await fetch(`/api/session/active/${name}`);
    const data = await response.json();
    return data;
}

const getActiveTutorSessions = async (name) => {
    const response = await fetch(`/api/session/tutor/active/${name}`);
    const data = await response.json();
    return data;
}

const getPendingSessions = async (name) => {
    const response = await fetch(`/api/session/pending/${name}`);
    const data = await response.json();
    return data;
}

const getPendingTutorSessions = async (name) => {
    const response = await fetch(`/api/session/tutor/pending/${name}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const getCanceledSessions = async (name) => {
    const response = await fetch(`/api/session/canceled/${name}`);
    const data = await response.json();
    return data;
}

const getCanceledTutorSessions = async (name) => {
    const response = await fetch(`/api/session/tutor/canceled/${name}`);
    const data = await response.json();
    return data;
}

const getSessionById = async (id) => {
    const response = await fetch(`/api/session/${id}`);
    const data = await response.json();
    return data;
};

const getSessionsByTutorId = async (id) => {
    const response = await fetch(`/api/session/tutor/${id}`);
    const data = await response.json();
    return data;
}

const getSessionByStudentId = async (id) => {
    const response = await fetch(`/api/session/student/${id}`);
    const data = await response.json();
    return data;
}

const putPendingSession = async (session) => {
    const pendingSession = SessionBuilder.createPendingSession(session);
    const id = await fetch('/api/session/id',).then(res => res.json());
    pendingSession.id = id;
    const response = await fetch(`/api/session/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pendingSession),
    });
    const data = await response.json();
    return data;
}

const putCancelledSession = async (session) => {
    const cancelledSession = SessionBuilder.createDeclinedSession(session);
    const id = await fetch('/api/session/id',).then(res => res.json());
    cancelledSession.id = id;
    const response = await fetch(`/api/session/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cancelledSession),
    });
    const data = await response.json();
    return data;
}

const approveSession = async (session) => {
    console.log("This is what we're getting",session);
    const approvedSession = SessionBuilder.createActiveSession(session);
    // const id = await fetch('/api/session/id',).then(res => res.json());
    // approvedSession.id = id;
    const response = await fetch(`/api/session/update/${session.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvedSession),
    });
    const data = await response.json();
    return data;
}

const declineSession = async (session) => {
    const declinedSession = SessionBuilder.createDeclinedSession(session);
    // const id = await fetch('/api/session/id',).then(res => res.json());
    // declinedSession.id = id;
    const response = await fetch(`/api/session/update/${session.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(declinedSession),
    });
    const data = await response.json();
    return data;
}

const updateSession = async (session, params) => {
    const updatedSession = SessionBuilder.updateSession(session, params);
    const response = await fetch(`/api/session/update/${updatedSession.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSession),
    });
    const data = await response.json();
    return data;
}

const sendChat = async (id, sender, message) => {
    const response = await fetch(`/api/session/chat/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, message }),
    });
    const data = await response.json();
    return data;
}

const getChat = async (id) => {
    const response = await fetch(`/api/session/chat/${id}`);
    const data = await response.json();
    return data;
}

const endSession = async (id) => {
    const response = await fetch(`/api/session/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

export {
    getActiveSessions,
    getPendingSessions,
    getCanceledSessions,
    getSessionById,
    getSessionsByTutorId,
    getSessionByStudentId,
    putPendingSession,
    putCancelledSession,
    sendChat,
    getChat,
    endSession,
    getActiveTutorSessions,
    getPendingTutorSessions,
    getCanceledTutorSessions,
    approveSession,
    declineSession,
};