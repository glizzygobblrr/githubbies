import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';  // Ensure this is correct
import Operator from './components/operator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />  {/* Admin route */}
        <Route path="/operator" element={<Operator />} />
        <Route path="*" element={<Login />} /> {/* Default route to login */}
      </Routes>
    </Router>
  );
};

export default App;
