import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../styles/admin.css';

const Admin = ({ user }) => {
    return (
        <div className="admin-page">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="admin-sections-container">
                <div className="admin-section">
                    <h2>User Management</h2>
                    <p>Here you can add, update, or remove users and assign roles.</p>
                    <button className="admin-btn" onClick={() => console.log('Navigating to User Management')}>Manage Users</button>
                </div>
                
                <div className="admin-section">
                    <h2>Campaign Control</h2>
                    <p>Set up and control ad campaigns, including scheduling and content selection.</p>
                    <button className="admin-btn" onClick={() => (window.location.href = "./campaign")}>Manage Campaigns</button>
                </div>

                <div className="admin-section">
                    <h2>Reports and Analytics</h2>
                    <p>View performance metrics and analyze ad distribution data.</p>
                    <button className="admin-btn" onClick={() => console.log('Navigating to Reports')}>View Reports</button>
                </div>

                <div className="admin-section">
                    <h2>Create New Template</h2>
                    <p>Design and create new ad templates for campaigns.</p>
                    <Link to="./template-editor">
                        <button className="admin-btn">Create New Template</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Admin;
