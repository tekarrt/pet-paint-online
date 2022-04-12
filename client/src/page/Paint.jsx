import React from 'react';

import Canvas from '../components/Canvas';
import Modal from '../components/Modal';
import Toolbar from '../components/Toolbar';

const Paint = () => {
    return (
        <div className='app'>
            <Modal/>
            <div className='container'>
                <Canvas/>
                <Toolbar/>
            </div>
        </div>
    );
};

export default Paint;