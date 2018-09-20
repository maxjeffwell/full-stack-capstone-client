// Rendering/React layer control - determines which set of components should be shown on screen (put react router related logic here)

import React from 'react';
import './AppStyle.css';

export default ({ children }) => {
    return (
        <div className="container">
            { children }
        </div>
    );
};
