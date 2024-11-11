import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/admin';
import Operator from './components/operator';
import ContentCreator from './components/contentCreator';
import ProtectedRoute from './components/protectedRoutes';
import TemplateEditor from './components/templates/templateEditor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin/template-editor" element={<TemplateEditor />} />
        <Route path="/operator" element={<ProtectedRoute><Operator /></ProtectedRoute>} />
        <Route path="/content-creator" element={<ProtectedRoute><ContentCreator /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
