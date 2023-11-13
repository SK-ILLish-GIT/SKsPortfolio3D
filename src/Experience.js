import { MathUtils } from "three";
import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useState, useEffect, useRef } from "react";
import ActionButton from "./ActionButton";
//leva controls
// import { useControls } from 'leva'

//animation
import gsap from "gsap";

//models
function Chair(props) {
  const chair = useGLTF("./chair.glb", true);
  // Animation properties
  // const rotationSpeed = MathUtils.degToRad(5); // Speed of rotation in radians per second
  // const maxRotation = MathUtils.degToRad(45); // Maximum rotation angle
  // const initialRotation = chair.scene.rotation.y; // Store the initial rotation for resetting

  // // Variables for tracking rotation
  // let rotationAngle = 0;
  // let rotationDirection = 1;

  // useFrame((state, delta) => {
  //   // Update the rotation angle based on time and direction
  //   rotationAngle += rotationDirection * rotationSpeed * delta;

  //   // Check if the maximum rotation angle is reached
  //   if (rotationAngle >= maxRotation || rotationAngle <= -maxRotation) {
  //     // Change rotation direction
  //     rotationDirection *= -1;
  //   }
  //   // Set the chair's rotation
  //   chair.scene.rotation.y = initialRotation + rotationAngle;
  // });
  return <primitive object={chair.scene} {...props} />;
}

export default function Experience() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  //Loading the model
  const handleDownloadCV = () => {
    const cvUrl =
      "https://drive.google.com/file/d/1F9HjM6DJ0z81nMJzoOHpC0V-J8Q2Isfm/view";
    window.open(cvUrl, "_blank");
  };
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

  //day-night state
  const [timeOfDay, setTimeOfDay] = useState(0); // 0 represents day, 1 represents night
  const directionalLightRef = useRef();
  const pointLightRef = useRef();
  const meshref = useRef();
  const handleToggleDayNight = () => {
    setTimeOfDay((prevTime) => (prevTime === 0 ? 1 : 0));
  };

  const handleClickMesh = () => {
    //zoom to the screen
    gsap.to(meshref.current.position, {
      x: -2.1,
      y: -0.9,
      z: 2.5,
      duration: 3,
    });
    gsap.to(meshref.current.rotation, { x: 0, y: -0.8, z: 0, duration: 2 });
    gsap.to(meshref.current.scale, { x: 1, y: 1, z: 1, duration: 2.2 });
  };
  const handleMoveToInitialPosition = () => {
    gsap.to(meshref.current.position, { x: 0, y: -1.2, z: 0, duration: 3 });
    gsap.to(meshref.current.rotation, { x: 0, y: 0.25, z: 0, duration: 2 });
    gsap.to(meshref.current.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 2.2 });
  };

  return (
    <>
      <color
        args={[timeOfDay === 0 ? "skyblue" : "midnightblue"]}
        attach="background"
      />
      <Environment preset={timeOfDay === 0 ? "dawn" : "night"} />
      <ambientLight intensity={timeOfDay === 0 ? 0.3 : 0.1} />
      <directionalLight
        ref={directionalLightRef}
        color={timeOfDay === 0 ? "white" : "dimgray"}
        position={[2, 5, 2]}
        intensity={timeOfDay === 0 ? 0.6 : 0.2}
        castShadow
      />
      {timeOfDay === 1 && (
        <pointLight
          ref={pointLightRef}
          color="dimgray"
          position={[0, 2, 0]}
          intensity={0.1}
        />
      )}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{
          mass: 2,
          tension: 400,
          damping: 0.5,
        }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={60}
            color={"#ffffff"}
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
              <iframe src="https://sksportfolio2d.netlify.app/" />
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
      <Chair position={[0.8, -1.2, 1.5]} rotation={[0, -4.6, 0]} />
      <Html position={[-2.8, 1.75, 0.55]}>
        <ActionButton
          top="20px"
          left="20px"
          onClick={handleDownloadCV}
          label="Resume 🔽"
        />
        <ActionButton
          top="90px"
          left="20px"
          onClick={handleMoveToInitialPosition}
          label="Initial Position ⏮️"
        />
        <ActionButton
          top="160px"
          left="20px"
          onClick={() =>
            (window.location.href = "https://sksportfolio2d.netlify.app/")
          }
          label="2D site 🌐"
        />
      </Html>
      <Html position={[4, 3, 0.55]}>
        <ActionButton
          top="200px"
          left="20px"
          onClick={handleToggleDayNight}
          label={timeOfDay === 0 ? "Night 🌙" : "Day 🌞"}
        />
      </Html>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
