import React from 'react';
import { useRef, useState } from 'react';
import canvasState from '../store/canvasState';

import '../styles/modal.scss'

const Modal = () => {

    const [modal, setModal] = useState(true);

    const connectionHeandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    const usernameRef = useRef();

    return (
        <div style={modal ? {display: 'flex'} : {display: 'none'}} className='modal__container'>
                <div className='modal'>
                    <h1> Введите ваше имя </h1>
                    <input placeholder='Имя пользователя' type="text" ref={usernameRef}/>
                    <button onClick={() => connectionHeandler()}>Войти</button>
                </div>
        </div>
    );
};

export default Modal;