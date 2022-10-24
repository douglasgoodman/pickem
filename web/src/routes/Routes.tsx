import React from 'react';
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom';
import { AuthComplete } from '../pages/AuthComplete';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';

const titles = {
    '/': 'Send Picks',
    '/signin': 'Send Picks - Sign in',
    '/authcomplete': 'Send Picks - authentication complete...',
};

export const Routes: React.FC = () => {
    //const location = useLocation();

    return (
        <ReactRoutes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/authcomplete" element={<AuthComplete />} />
        </ReactRoutes>
    );
};
