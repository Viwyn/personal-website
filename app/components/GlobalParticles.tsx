'use client';

import { useMemo } from "react";
import Particles from "./Particles";

const GlobalParticles = () => {
    // Memoize the Particles component to prevent re-rendering
    const particlesComponent = useMemo(() => (
        <Particles
            particleColors={["#F5A9B8", "#FFFFFF", "#5BCEFA", "#F5A9B8"]}
            particleCount={1000}
            particleSpread={20}
            speed={0.5}
            particleBaseSize={300}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={true}
        />
    ), []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1,
                pointerEvents: "none",
            }}
        >
            {particlesComponent}
        </div>
    );
};

export default GlobalParticles;