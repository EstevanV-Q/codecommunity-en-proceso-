import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CoursesPage from '../pages/Courses';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CourseManagement from '../pages/admin/CourseManagement';
import Contact from '../pages/Contact';
import Community from '../pages/Community';
import Announcements from '../pages/Announcements';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<CourseManagement />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/community" element={<Community />} />
      <Route path="/announcements" element={<Announcements />} />
    </Routes>
  );
};

export default AppRoutes; 