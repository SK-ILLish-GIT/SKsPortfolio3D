import { MathUtils } from 'three';
import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useState, useEffect, useRef } from 'react';
//leva controls
// import { useControls } from 'leva'

//animation
import gsap from 'gsap';


//random color generator
function getRandomColor() {
  let r, g, b;
  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (
    (r > 200 && g > 200 && b > 200) || // Exclude colors closer to white
    (r < 55 && g < 55 && b < 55) // Exclude colors closer to black
  );

  return `rgb(${r}, ${g}, ${b})`;
}


//models
function Chair(props) {
  const chair = useGLTF('./chair.glb', true)
  // Animation properties
  const rotationSpeed = MathUtils.degToRad(5); // Speed of rotation in radians per second
  const maxRotation = MathUtils.degToRad(45); // Maximum rotation angle
  const initialRotation = chair.scene.rotation.y; // Store the initial rotation for resetting

  // Variables for tracking rotation
  let rotationAngle = 0;
  let rotationDirection = 1;

  useFrame((state, delta) => {
    // Update the rotation angle based on time and direction
    rotationAngle += rotationDirection * rotationSpeed * delta;

    // Check if the maximum rotation angle is reached
    if (rotationAngle >= maxRotation || rotationAngle <= -maxRotation) {
      // Change rotation direction
      rotationDirection *= -1;
    }

    // Set the chair's rotation
    chair.scene.rotation.y = initialRotation + rotationAngle;
  });
  return <primitive object={chair.scene} {...props} />
}

export default function Experience() {
  const computer = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  )
  // const { position, rotation, scale } = useControls({
  //   position: {
  //     value: [0, -1.2, 0],
  //     step: 0.0,
  //   },
  //   rotation: {
  //     value: [0, 0.25, 0],
  //     step: 0.0,
  //   },
  //   scale: {
  //     value: [0.8, 0.8, 0.8],
  //     step: 0.0,
  //   },
  // })

  const handleDownloadCV = () => {
    const cvUrl = './resume/SK_s_Resume.pdf';
    window.open(cvUrl, '_blank');
  };
  const meshref = useRef();
  useFrame(() => {
    // meshref.current.rotation.y += 0.01;
  });
  const handleClickMesh = () => {
    // gsap.to(meshref.current.position, { x: 0, y: 0, z: 0, duration: 1 });
    // gsap.to(meshref.current.rotation, { x: 0, y: 0, z: 0, duration: 1 });
    //zoom to the screen
    gsap.to(meshref.current.position, { x: -2.1, y: -.9, z: 2.5, duration: 3 });
    gsap.to(meshref.current.rotation, { x: 0, y: -.8, z: 0, duration: 2 });
    gsap.to(meshref.current.scale, { x: 1, y: 1, z: 1, duration: 2.2 });
  };
  //   position={[0, -1.2, 0]}
  // rotation={[0, 0.25, 0]}
  // scale={[0.8, 0.8, 0.8]}
  const handleMoveToInitialPosition = () => {
    gsap.to(meshref.current.position, { x: 0, y: -1.2, z: 0, duration: 3 });
    gsap.to(meshref.current.rotation, { x: 0, y: 0.25, z: 0, duration: 2 });
    gsap.to(meshref.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 2.2 });
  };

  //generate a random color
  const randomColor = getRandomColor();

  return (
    <>
      <color args={[randomColor]} attach="background" />
      <Environment preset="city" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{
          mass: 2,
          tension: 400,
          damping: .5,
        }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={60}
            color={'#ffffff'}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive
            object={computer.scene}
            // position-y={-1.2}
            // rotation={[0, 0.25, 0]}
            // scale={[0.8, 0.8, 0.8]}
            position={[0, -1.2, 0]}
            rotation={[0, 0.25, 0]}
            scale={[0.8, 0.8, 0.8]}
            ref={meshref}
            onClick={handleClickMesh}
          >
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              {/* <iframe src=" https://portal-omega-ten.vercel.app" /> */}
              <iframe src="https://sksportfolio2d.netlify.app/" />
              {/* <div className="screenButtons">
                <button onClick={handleDownloadCV}>Download CV</button>
                <button onClick={handleMoveToInitialPosition}>Close</button>
              </div> */}
              {/* <div style={{ position: 'absolute', top: '100px', right: '20px', zoom: '1.25' }}>
                <button onClick={() => window.location.href = 'https://sksportfolio2d.netlify.app/'}>2D site</button>
              </div> */}

            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.5}
            position={[1.6, -0.15, -0.245]}
            rotation-y={-1.25}
            maxWidth={2}
          >
            SK's Portfolio
          </Text>
        </Float>
      </PresentationControls>
      <Chair
        position={[0.8, -1.2, 1.5]}
        rotation={[0, -4.6, 0]}
      />
      <Html position={[-2.8, 1.75, 0.55]}>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(220, 220, 220, 0.6)',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            width: '100px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleDownloadCV}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Resume  🔽
        </div>
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            background: 'rgba(220, 220, 220, 0.6)',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            width: '100px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleMoveToInitialPosition}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Initial Position ⏮️
        </div>
        <div
          style={{
            position: 'absolute',
            top: '180px',
            left: '20px',
            background: 'rgba(220, 220, 220, 0.6)',
            color: 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            width: '100px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => (window.location.href = 'https://sksportfolio2d.netlify.app/')}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          2D site 🌐
        </div>

      </Html>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  )
}
