import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// A single dot (pip)
// A single dot (pip) - flattened
const Pip = ({ position, color }) => (
    <mesh position={position}>
        <circleGeometry args={[0.09, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.9} />
    </mesh>
);

// Map numbers 1-6 to dot positions
const DieFace = ({ number, position, rotation, dotColor }) => {
    const pips = useMemo(() => {
        const offset = 0.35;
        const positions = [];

        // Logic for standard dice face patterns
        // Center
        if (number === 1 || number === 3 || number === 5) {
            positions.push([0, 0, 0]);
        }
        // Top-Left & Bottom-Right
        if (number > 1) {
            positions.push([-offset, offset, 0]);
            positions.push([offset, -offset, 0]);
        }
        // Top-Right & Bottom-Left
        if (number >= 4) {
            positions.push([offset, offset, 0]);
            positions.push([-offset, -offset, 0]);
        }
        // Middle-Left & Middle-Right (for 6)
        if (number === 6) {
            positions.push([-offset, 0, 0]);
            positions.push([offset, 0, 0]);
        }

        return positions;
    }, [number]);

    return (
        <group position={position} rotation={rotation}>
            {pips.map((pos, i) => (
                <Pip key={i} position={[pos[0], pos[1], 0.601]} color={dotColor} /> // Flush with face
            ))}
        </group>
    );
};

const Dice = ({ position, onRoll, rollTrigger, delayOffset = 0, bodyColor, dotColor }) => {
    const mesh = useRef();
    const [targetRotation, setTargetRotation] = useState(new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0));

    // Listen for roll trigger from parent
    useEffect(() => {
        if (rollTrigger === 0) return; // Skip initial mount if desired, or let it stay random

        const extraIter = (Math.PI * 2) * (2 + Math.floor(Math.random() * 2));
        const x = targetRotation.x + extraIter + (Math.random() * Math.PI);
        const y = targetRotation.y + extraIter + (Math.random() * Math.PI);
        const z = targetRotation.z + extraIter + (Math.random() * Math.PI);
        setTargetRotation(new THREE.Euler(x, y, z));
    }, [rollTrigger]);

    const handleClick = (e) => {
        e.stopPropagation();
        if (onRoll) onRoll();
    };

    useFrame((state, delta) => {
        if (mesh.current) {
            // Rotation interpolation
            const speed = 6 * delta;
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotation.x, speed);
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotation.y, speed);
            mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, targetRotation.z, speed);

            // Bounce math
            const time = state.clock.elapsedTime;
            const bounceSpeed = 4;
            const bounceHeight = 0.15;
            const yOffset = Math.abs(Math.sin((time + delayOffset) * bounceSpeed)) * bounceHeight;
            mesh.current.position.y = position[1] + yOffset;
        }
    });

    return (
        <group ref={mesh} position={position} onClick={handleClick}>
            <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.2} smoothness={4}>
                <meshStandardMaterial color={bodyColor} roughness={0.2} />
            </RoundedBox>
            <DieFace number={1} position={[0, 0, 0]} rotation={[0, 0, 0]} dotColor={dotColor} />
            <DieFace number={6} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} dotColor={dotColor} />
            <DieFace number={2} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} dotColor={dotColor} />
            <DieFace number={5} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} dotColor={dotColor} />
            <DieFace number={3} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} dotColor={dotColor} />
            <DieFace number={4} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} dotColor={dotColor} />
        </group>
    );
};

const ThreeDice = ({ onClick, bodyColor = "#fafafa", dotColor = "#111" }) => {
    const [rollTrigger, setRollTrigger] = useState(0);

    const handleRoll = () => {
        setRollTrigger(prev => prev + 1);
        if (onClick) onClick();
    };

    return (
        <div style={{ width: '80px', height: '50px', cursor: 'pointer' }} title="Roll for Theme">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 10, 5]} intensity={1} />
                <pointLight position={[-5, -10, 5]} intensity={0.5} />

                {/* Two Dice, side by side, synchronized */}
                <Dice
                    position={[-0.7, 0, 0]}
                    onRoll={handleRoll}
                    rollTrigger={rollTrigger}
                    delayOffset={0}
                    bodyColor={bodyColor}
                    dotColor={dotColor}
                />
                <Dice
                    position={[0.7, 0, 0]}
                    onRoll={handleRoll}
                    rollTrigger={rollTrigger}
                    delayOffset={1}
                    bodyColor={bodyColor}
                    dotColor={dotColor}
                />

            </Canvas>
        </div>
    );
};

export default ThreeDice;
