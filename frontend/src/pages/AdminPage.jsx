import React, { useState } from 'react';
import '../styles/AdminPage.css';

function AdminPage() {
  const initialUsers = [
    {
      firstName: 'John',
      lastName: 'x',
      email: 'student@example.com',
      password: 'password1',
      birthday: '',
      major: 'Computer Science',
      language: 'English',
      isTutor: false,
      isAdmin: false,
      notifications: true,
      proofdoc: 'https://i.pinimg.com/736x/cc/6d/1a/cc6d1a85ec293d05b2a67fd1c273af88.jpg',
      isApproved: false,
    },
    {
      firstName: 'Mark',
      lastName: 'y',
      email: 'tutor@example.com',
      password: 'password2',
      birthday: '',
      major: 'Computer Science',
      language: 'English',
      isTutor: true,
      isAdmin: false,
      notifications: true,
      proofdoc: 'https://i.pinimg.com/736x/cc/6d/1a/cc6d1a85ec293d05b2a67fd1c273af88.jpg',
      isApproved: false,
    },
    {
      firstName: 'Jack',
      lastName: 'y',
      email: 'tutor2@example.com',
      password: 'password2',
      birthday: '',
      major: 'Computer Science',
      language: 'English',
      isTutor: true,
      isAdmin: false,
      notifications: true,
      proofdoc: 'https://i.pinimg.com/736x/cc/6d/1a/cc6d1a85ec293d05b2a67fd1c273af88.jpg',
      isApproved: false,
    },
    {
      firstName: 'Tim',
      lastName: 'z',
      email: 'admin@example.com',
      password: 'password3',
      birthday: '',
      major: '',
      language: 'English',
      isTutor: false,
      isAdmin: true,
      notifications: true,
      proofdoc: null,
      isApproved: true,
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [justApprovedTutors, setJustApprovedTutors] = useState([]);
  const [viewingProofDoc, setViewingProofDoc] = useState(null);

  const handleApprove = (user) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === user.email ? { ...u, isApproved: true } : u
      )
    );
    setJustApprovedTutors((prev) => [...prev, { ...user, isApproved: true }]);
  };

  const handleReject = (user) => {
    setUsers((prevUsers) =>
      prevUsers.filter((u) => u.email !== user.email)
    );
  };

  const pendingTutors = users.filter(
    (user) => user.isTutor && !user.isAdmin && !user.isApproved
  );

  const handleSignOut = () => {
    alert('You have been signed out!');
    window.location.href = '/';
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      <section className="pending-tutors">
        <h2>Pending Tutors</h2>
        {pendingTutors.length === 0 ? (
          <p>No pending tutors.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Proof Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTutors.map((user) => (
                <tr key={user.email}>
                  <td>
                    {user.tutor.name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.proofdoc ? (
                      <button
                        className="view-button"
                        onClick={() => setViewingProofDoc(user.proofdoc)}
                      >
                        View Proof Document
                      </button>
                    ) : (
                      'No document provided'
                    )}
                  </td>
                  <td>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(user)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(user)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {viewingProofDoc && (
        <div className="proofdoc-modal">
          <div className="proofdoc-content">
            <img src={viewingProofDoc} alt="Proof Document" />
            <button
              className="close-button"
              onClick={() => setViewingProofDoc(null)}
            >
              X
            </button>
          </div>
        </div>
      )}

      <section className="approved-tutors">
        <h2>Just Approved Tutors</h2>
        {justApprovedTutors.length === 0 ? (
          <p>No tutors approved yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {justApprovedTutors.map((user) => (
                <tr key={user.email}>
                  <td>
                    {user.tutor.name}
                  </td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminPage;
