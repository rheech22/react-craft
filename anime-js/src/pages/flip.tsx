import { animate, createScope, Scope } from "animejs";
import { useEffect, useRef } from "react";

import "./flip.css";

export const Flip = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const isPlaying = useRef<boolean>(false);

  useEffect(() => {
    scope.current = createScope({ root }).add((scope) => {
      if (!root.current) return;
      const card = (root.current as HTMLElement).querySelector(".card");
      if (!card) return;

      scope.add("flip", () => {
        if (isPlaying.current) return;
        isPlaying.current = true;
        animate(card, {
          scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
          rotateY: "+=180",
          easing: "easeInOutSine",
          duration: 200,
          onComplete: () => {
            isPlaying.current = false;
          },
        });
      });
    });

    return () => scope.current?.revert();
  }, []);

  const handleClick = () => {
    scope.current?.methods.flip();
  };

  return (
    <div ref={root} className="flip">
      <div className="card">
        <div className="front">A</div>
        <div className="back">B</div>
      </div>
      <button onClick={handleClick}>Flip</button>
    </div>
  );
};
