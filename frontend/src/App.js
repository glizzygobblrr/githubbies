// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';
import Operator from './components/operator';
import Campaign from './components/campaign';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/operator" element={<Operator />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
