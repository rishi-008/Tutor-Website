import React, {useState} from "react";
import { approveSession, declineSession } from "../../controllers/SessionController";
function SinglePendingStudentConnectionRequestModal(props) {


  console.log("testy ");
  console.log("test of the connection message", props.session.message);
  console.log("this is the session id", props.session.id);
  console.log("this is the session", props.session);

  const [reasonForDeclining, setReasonForDeclining] = useState('');
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Student: {props.session.student}</h2>
        {/* <h3>Focus: {props.session.focus}</h3> */}
        <p>Connection Message: {props.session.message}</p>
        <textarea
          value={reasonForDeclining}
          onChange={(e) => setReasonForDeclining(e.target.value)}
          placeholder="Reason for declining"
        />

        <div className="button-container"> 
          <button id="acceptButton" onClick={() => approveSession(props.session)}>Approve</button>
          <button id="denyButton" onClick={() => {
            const session = {
              id: props.session.id,
              tutor: props.session.tutor,
              tutorId: props.session.tutorid,
              student: props.session.student,
              studentId: props.session.studentId,
              status: 'pending',
              reason: reasonForDeclining
          };
            declineSession(session)}}>Deny</button>
          <button id="closeButton" onClick={() => props.isOpen(false)}> Close </button>
        </div>
        
      </div>
      <style jsx>{`
        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        textarea {
          width: 100%;
          height: 100px;
          margin-top: 10px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc
        }
        .modalContent {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 50%;
          max-height: 80%;
          overflow-y: auto;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
        }

        .modalCourseCards {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        button {
          margin-top: 20px;
          padding: 10px 15px;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        #denyButton {
          background: red;
        }
        #acceptButton {
          background: green;
        }
        #closeButton {
          background: grey;
        }

      `}</style>
    </div>
  );
}

export default SinglePendingStudentConnectionRequestModal;