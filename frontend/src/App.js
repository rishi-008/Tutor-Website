import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import StudentExplorePage from './pages/studentpages/StudentExplorePage';
import StudentMyCoursesPage from './pages/studentpages/StudentMyCoursesPage';
import StudentCoursePage from './pages/studentpages/StudentCoursePage';
import StudentNotificationsPage from './pages/studentpages/StudentNotificationsPage';
import StudentSettingsPage from './pages/studentpages/StudentSettingsPage';
import TutorProfilePage from './pages/studentpages/TutorProfilePage-NonEditableStudentView';
import AdminPage from './pages/AdminPage';
import StudentTutorExplorePage from './pages/studentpages/TutorSearchPage';
import TutorPortalPage from './pages/TutorDashboard';
import './styles/App.css';


const Router = createBrowserRouter([
  {
  path: '/',
  element: <HomePage />
  },
  {
  path: '/login',
  element: <LoginPage />
  },
  {
  path: '/register',
  element: <RegisterPage />
  },
  {
    path: '/userPortal',
    element: <UserDashboard />
  },
  {
    path: '/studentExplore',
    element: <StudentExplorePage />
  },
  {
    path: '/studentMyCourses',
    element: <StudentMyCoursesPage />,
    children: [
      {
        path: ':courseId',
        element: <StudentCoursePage />
      }
    ]
  },
  {
    path: '/studentNotifications',
    element: <StudentNotificationsPage />
  },
  {
    path: '/studentSettings',
    element: <StudentSettingsPage />
  },
{
path: '/tutorProfile',
element: <TutorProfilePage />
},
{
path: '/tutorPortal',
element: <TutorPortalPage />
},

  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: "/tutorsearch",
    element: <StudentTutorExplorePage />
  }
])

function App() {
  return (
    <RouterProvider router={Router} />
  );
}

export default App;
