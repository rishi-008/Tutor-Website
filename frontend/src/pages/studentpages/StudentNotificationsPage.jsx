import React, { useState } from 'react';

function NotificationsPage({ notifications }) {
    console.log("these are the notifications we're getting",notifications);
    const [notificationData, setNotificationData] = useState(notifications || []);

    const handleDismissNotification = (id) => {
        const updatedNotifications = notificationData.filter(notification => notification.id !== id);
        setNotificationData(updatedNotifications);
    };

    if (!notificationData) {
        return <p>There was an error retrieving your notification information.</p>;
    }

    const urgentNotifications = notificationData.filter(n => n.category === 'urgent');
    const allNotifications = notificationData.filter(n => n.category !== 'urgent');

    return (
        <div className="notificationsContainer">
            {/* Urgent Notifications Section */}
            <div className="urgentNotifications">
                <h2>Urgent Notifications</h2>
                {urgentNotifications.length > 0 ? (
                    urgentNotifications.map(notification => (
                        <div key={notification.id} className="notificationCard">
                            <p>{notification.message}</p>
                            <button className="dismissButton" onClick={() => handleDismissNotification(notification.id)}>
                                Dismiss
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No urgent notifications.</p>
                )}
            </div>

            {/* All Notifications Section */}
            <div className="allNotifications">
                <h2>All Notifications</h2>
                <div className="scrollContainer">
                    {allNotifications.length > 0 ? (
                        allNotifications.map(notification => (
                            <div key={notification.id} className="notificationCard">
                                <p>{notification.message}</p>
                                <button className="dismissButton" onClick={() => handleDismissNotification(notification.id)}>
                                    Dismiss
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No notifications.</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .notificationsContainer {
                    padding: 20px;
                }

                .urgentNotifications, .allNotifications {
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin-bottom: 20px;
                }

                .scrollContainer {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .notificationCard {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin-bottom: 10px;
                }

                .dismissButton {
                    background: none;
                    border: none;
                    color: blue;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default NotificationsPage;
