import { Group, MathUtils } from "three";
import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
//animation
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import React, { useState, useEffect, useRef } from "react";
import ActionButton from "./components/ActionButton";
//leva controls
// import { useControls } from "leva";

import { Avatar } from "./components/Avatar";
import { Desk } from "./components/Desk";
import { Keyboard } from "./components/Keyboard";
import { Mouse } from "./components/Mouse";
import { Chair } from "./components/Chair";
//models
export default function Experience() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  const handleDownloadCV = () => {
    const cvUrl =
      "https://drive.google.com/file/d/1F9HjM6DJ0z81nMJzoOHpC0V-J8Q2Isfm/view";
    window.open(cvUrl, "_blank");
  };

  // const { position, rotation, scale } = useControls({
  //   position: {
  //     value: [0, -1.2, 0],
  //     step: 0.1,
  //   },
  //   rotation: {
  //     value: [0, 0.25, 0],
  //     step: 0.1,
  //   },
  //   scale: {
  //     value: [0.8, 0.8, 0.8],
  //     step: 0.1,
  //   },
  // });

  const [timeOfDay, setTimeOfDay] = useState(0);
  const directionalLightRef = useRef();
  const pointLightRef = useRef();
  const meshref = useRef();

  const handleToggleDayNight = () => {
    setTimeOfDay((prevTime) => (prevTime === 0 ? 1 : 0));
  };

  const handleClickMesh = () => {
    gsap.to(meshref.current.position, {
      y: -0.5, // Adjust the desired height
      x: -2.1,
      z: 1,
      duration: 1,
      onComplete: () => {
        // After going up, come close to the camera
        gsap.to(meshref.current.position, {
          x: -2.1,
          y: -0.9,
          z: 2.5,
          duration: 2,
        });
      },
    });
    gsap.to(meshref.current.rotation, { x: 0, y: -0.8, z: 0, duration: 2 });
    gsap.to(meshref.current.scale, { x: 1, y: 1, z: 1, duration: 2.2 });
  };

  const handleMoveToInitialPosition = () => {
    if (
      meshref.current.position.x === -0.7 &&
      meshref.current.position.y === -1.3 &&
      meshref.current.position.z === -0.8
    ) {
      // Object is already in the initial position, no need to animate
      return;
    }
    gsap.to(meshref.current.position, {
      y: -0.5,
      x: -2.1,
      z: 1,
      duration: 1,
      onComplete: () => {
        gsap.to(meshref.current.position, {
          x: -0.7,
          y: -1.3,
          z: -0.8,
          duration: 3,
        });
      },
    });
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
        position={[
          computer.scene.position.x,
          computer.scene.position.y + 5,
          computer.scene.position.z,
        ]}
        intensity={timeOfDay === 0 ? 0.6 : 0.2}
        castShadow
      />
      {/* {timeOfDay === 1 && ( */}
      <pointLight
        ref={pointLightRef}
        color="white"
        position={[
          computer.scene.position.x,
          computer.scene.position.y + 2,
          computer.scene.position.z,
        ]}
        intensity={1} // Adjust intensity for better visibility at night
      />
      {/* )} */}
      <pointLight color="white" position={[-0.9, 2.6, 4.3]} intensity={1} />
      <PresentationControls
        // global
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
            position={[-0.7, -1.3, -0.8]}
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
            color={timeOfDay === 0 ? "midnightblue" : "white"}
            fontSize={0.5}
            position={[0.7, -0.3, -1.1]}
            rotation-y={-1.25}
            maxWidth={2}
            glow={timeOfDay === 0 ? "skyblue" : "white"} // Set glow color based on timeOfDay
            glowIntensity={0.5} // Adjust glow intensity
            glowThreshold={0.6} // Adjust glow threshold
            castShadow={false}
          >
            SK's Portfolio
          </Text>
        </Float>
      </PresentationControls>
      <group>
        <Desk
          position={[-0.2, -1.25, 1]}
          rotation={[0, 0.34, 0]}
          scale={[0.9, 0.6, 0.8]}
        />
        <Keyboard
          position={[-0.25, -0.9, 1.15]}
          rotation={[0, 0.35, 0]}
          scale={[0.09, 0.09, 0.09]}
        />
        <Mouse position={[0.1, -0.8, 1]} rotation={[0, 0.25, 0]} />
        <Chair
          position={[0.3, -1.1, 1.4]}
          rotation={[0, 1.95, 0]}
          scale={[0.8, 0.8, 0.8]}
        />
      </group>
      <group
        position={[0.2, -1.2, 1.7]}
        rotation={[-0.3, -2.65, -0.1]}
        scale={[0.8, 0.8, 0.8]}
      >
        <Avatar />
      </group>
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
