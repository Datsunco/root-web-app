import React from 'react';
import { Navigate } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { publicRoutes } from '../routes';

const AppRouter = () => {

    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
        </Routes>
    );
};

export default AppRouter;