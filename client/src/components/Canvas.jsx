import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import "../styles/canvas.scss"
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from "../tools/Brush";
import { useParams } from 'react-router-dom'

const Canvas = observer(() => {
    const canvasRef = useRef()
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`Пользователь ${msg.username} подключился к сессии`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break

            case "finish":
                ctx.beginPath()
                break
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1200} height={700} />
        </div>
    );
});

export default Canvas;