import {
  animate,
  createScope,
  createSpring,
  createDraggable,
  Scope,
} from "animejs";
import { useEffect, useRef, useState } from "react";
import reactLogo from "../assets/react.svg";

export const Rotation = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add((scope) => {
      animate(".logo", {
        scale: [
          { to: 2, ease: "inOut(3)", duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) },
        ],
        loop: true,
        loopDelay: 250,
      });

      createDraggable(".logo", {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 }),
      });

      scope.add("rotateLogo", (i) => {
        animate(".logo", {
          rotate: i * 360,
          ease: "out(4)",
          duration: 1500,
        });
      });
    });

    return () => scope.current?.revert();
  }, []);

  const handleClick = () => {
    const i = rotations + 1;
    setRotations(i);
    scope.current?.methods.rotateLogo(i);
  };

  return (
    <div
      ref={root}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <img src={reactLogo} className="logo" alt="React logo" />
      </div>
      <button onClick={handleClick}>rotations: {rotations}</button>
    </div>
  );
};
