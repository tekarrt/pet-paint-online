import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Paint from './page/Paint';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/:id'
                    element={<Paint/>}
                />
                <Route
                    path='*'
                    element={<Navigate to={`f${(+new Date).toString(16)}`} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;