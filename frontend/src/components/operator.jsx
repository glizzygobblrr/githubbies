import React from 'react';
import '../styles/operator.css';

const Operator = () => {
    return (
        <div className="operator-page">
            <h1>Operator Dashboard</h1>
            
            <div className="operator-section">
                <h2>Active Campaigns</h2>
                <p>Monitor and manage active ad campaigns assigned to your TV groups.</p>
                <button onClick={() => console.log('Viewing Active Campaigns')}>View Campaigns</button>
            </div>
            
            <div className="operator-section">
                <h2>Ad Scheduling</h2>
                <p>Schedule ads for specific times or events.</p>
                <button onClick={() => console.log('Navigating to Ad Scheduling')}>Schedule Ads</button>
            </div>
            
            <div className="operator-section">
                <h2>System Status</h2>
                <p>Monitor the status of TV groups and ensure smooth ad distribution.</p>
                <button onClick={() => console.log('Checking System Status')}>Check Status</button>
            </div>
        </div>
    );
};

export default Operator;
