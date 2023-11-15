import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { Loader } from '@react-three/drei'
import { Suspense } from 'react'
import Cursor from './components/Cursor.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Cursor/>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-3, 1.5, 4]
            }}
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
        <Loader />
    </>
)