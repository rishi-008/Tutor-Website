class SessionBuilder {
    constructor() {
        this.session = {
            id: null,
            student: '',
            studentId: 0,
            tutor: '',
            tutorId: 0,
            focus: '',
            profilePic: '',
            status: '',
            startTime: new Date().toISOString(),
            endTime: '',
            duration: 0,
            progress: 0,
            reportId: null,
            description: '',
            chatMessages: [],
            resources: [],
            classLink: '',
            message: null,
            reason: null
        };
    }

    setId(id) {
        this.session.id = id;
        return this;
    }

    setStudentId(studentId) {
        this.session.studentId = studentId;
        return this;
    }

    setTutorId(tutorId) {
        this.session.tutorId = tutorId;
        return this;
    }

    setStudent(student) {
        this.session.student = student;
        return this;
    }

    setTutor(tutor) {
        this.session.tutor = tutor;
        return this;
    }

    setFocus(focus) {
        this.session.focus = focus;
        this.setClassLink(`https://zoom.com/${focus}`);
        return this;
    }

    setProfilePic(profilePic) {
        this.session.profilePic = profilePic;
        return this;
    }

    setStatus(status) {
        this.session.status = status;
        return this;
    }

    setStartTime(startTime) {
        this.session.startTime = startTime;
        return this;
    }

    setEndTime(endTime) {
        this.session.endTime = endTime;
        return this;
    }

    setDuration(duration) {
        this.session.duration = duration;
        this.session.endTime = new Date(this.session.startTime).setMinutes(new Date(this.session.startTime).getMinutes() + duration);
        // this.session.endTime = new Date(this.session.startTime).setMinutes(this.session.startTime.getMinutes() + duration);
        return this;
    }

    setProgress(progress) {
        this.session.progress = progress;
        return this;
    }

    setReportId(reportId) {
        this.session.reportId = reportId;
        return this;
    }

    setChatMessages(chatMessages) {
        this.session.chatMessages = chatMessages;
        return this;
    }

    setResources(resources) {
        this.session.resources = resources;
        return this;
    }

    setClassLink(classLink) {
        this.session.classLink = classLink;
        return this;
    }

    setMessage(message) {
        this.session.message = message;
        delete this.description;
        delete this.session.reason;
        delete this.session.reportId;
        delete this.session.progress;
        delete this.session.chatMessages;
        delete this.session.resources;
        delete this.session.classLink;
        return this;
    }

    setReason(reason) {
        this.session.reason = reason;
        delete this.description;
        delete this.session.message;
        delete this.session.reportId;
        delete this.session.progress;
        delete this.session.chatMessages;
        delete this.session.resources;
        delete this.session.classLink;
        return this;
    }

    setDescription(description) {
        this.session.description = description;
        delete this.message;
        delete this.reason;
        return this;
    }

    build() {
        return this.session;
    }

    /**
     * Updates the session with provided parameters
     * so if you only give "status" as a parameter, only the status will be updated
     * @param {session} session 
     * @param {params} params 
     * @returns 
     */
    static updateSession(session, params) {
        Object.keys(params).forEach(key => {
            if (session.hasOwnProperty(key)) {
                session[key] = params[key];
            }
        });
        return session;
    }

    /**
     * parms object needs:
     * student, tutor, focus, profilePic, reason
     * 
     * the rest will be handled by the builder
     * @param {session} params 
     * @returns 
     */
    static createDeclinedSession(params) {
        return new SessionBuilder()
            .setId(params.id)
            .setStudent(params.student)
            .setTutor(params.tutor)
            .setStudentId(params.studentId)
            .setTutorId(params.tutorId)
            .setFocus(params.focus)
            .setStatus('declined')
            .setReason(params.reason)
            .build();
    }

    /**
     * parms object needs:
     * student, tutor, focus, profilePic, duration, description
     * 
     * the rest will be handled by the builder
     * @param {session} params 
     * @returns 
     */
    static createActiveSession(params) {
        return new SessionBuilder()
            .setId(params.id)
            .setStudent(params.student)
            .setTutor(params.tutor)
            .setStudentId(params.studentId)
            .setTutorId(params.tutorId)
            .setFocus(params.focus)
            .setStatus('active')
            .setDuration(params.duration)
            .setDescription(params.description)
            .build();
    }

    /**
     * params object needs:
     * student, tutor, focus, profilePic, message
     * @param {session} params 
     * @returns 
     */
    static createPendingSession(params) {
        return new SessionBuilder()
            .setId(params.id)
            .setStudent(params.student)
            .setTutor(params.tutor)
            .setStudentId(params.studentId)
            .setTutorId(params.tutorId)
            .setFocus(params.focus)
            .setStatus('pending')
            .setMessage(params.message)
            .build();
    }
}

export default SessionBuilder;