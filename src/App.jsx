import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { mockMembers } from './data/mockMembers';
import AttendancePage from './pages/AttendancePage';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  // Global state for members
  const [members, setMembers] = useState(mockMembers);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation for Dev/Admin access - hidden or subtle in prod */}
        <nav style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.3 }}>
          <Link to="/" style={{ marginRight: '10px' }}>🏠</Link>
          <Link to="/admin">⚙️</Link>
        </nav>

        <Routes>
          <Route path="/" element={<AttendancePage members={members} setMembers={setMembers} />} />
          <Route path="/admin" element={<AdminDashboard members={members} setMembers={setMembers} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
