// Rendering/React layer control - determines which set of components should be shown on screen

import React from 'react';
import { Container } from 'semantic-ui-react';
import './AppStyle.css';

export default ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};
