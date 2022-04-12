import React from 'react';

import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';

import "../styles/toolbar.scss"

const Toolbar = () => {

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='toolbar'>
                <button className='toolbar__btn pen' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
                <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>
                <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
                <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
                <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
            </div>
            <div className='toolbar'>
                <input
                    onChange={e => changeColor(e)}
                    type="color"
                    className='input__color'
                />
                <input
                    onChange={e => toolState.setStrokeColor(e.target.value)}
                    type="color"
                    className='input__color'
                />
                <input
                    onChange={e => toolState.setLineWidth(e.target.value)}
                    id='line-width'
                    type="number"
                    min={1}
                    max={60}
                    defaultValue={1}
                />
            </div>
            <div className='toolbar'>
                <button className='toolbar__btn undo' onClick={() => canvasState.undo()}></button>
                <button className='toolbar__btn redo' onClick={() => canvasState.redo()}></button>
                <button className='toolbar__btn delete' onClick={() => canvasState.clear()}></button>
                <button className='toolbar__btn save'></button>
            </div>
        </div>
    );
};

export default Toolbar;