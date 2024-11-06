import React from 'react';
import '../styles/admin.css';

const Admin = () => {
    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <div className="admin-section">
                <h2>User Management</h2>
                <p>Here you can add, update, or remove users and assign roles.</p>
                <button onClick={() => console.log('Navigating to User Management')}>Manage Users</button>
            </div>
            
            <div className="admin-section">
                <h2>Campaign Control</h2>
                <p>Set up and control ad campaigns, including scheduling and content selection.</p>
                <button onClick={() => (window.location.href = "./campaign")}>Manage Campaigns</button>
            </div>

            
            <div className="admin-section">
                <h2>Reports and Analytics</h2>
                <p>View performance metrics and analyze ad distribution data.</p>
                <button onClick={() => console.log('Navigating to Reports')}>View Reports</button>
            </div>
        </div>
    );
};

export default Admin;
