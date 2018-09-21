import React from 'react';
import authRequired from './authRequired';

const Dashboard = () => {
    return (
        <div>
            <div>Teacher Dashboard</div>
        </div>
    );
};

export default authRequired(Dashboard);
