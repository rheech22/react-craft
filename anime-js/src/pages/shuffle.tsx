import { animate, createScope, Scope, stagger, utils } from "animejs";
import { useEffect, useRef } from "react";

import "./shuffle.css";

export const Shuffle = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const squares = utils.$(".square");

    scope.current = createScope({ root }).add((scope) => {
      const x = stagger("3.2rem");

      utils.set(squares, { x });

      scope.add("shuffle", () => {
        animate(utils.shuffle(squares), { x });
      });
    });

    return () => scope.current?.revert();
  }, []);

  const handleClick = () => {
    scope.current?.methods.shuffle();
  };

  return (
    <div ref={root} className="shuffle">
      <div className="row">
        <div className="square">A</div>
        <div className="square">B</div>
        <div className="square">C</div>
        <div className="square">D</div>
        <div className="square">E</div>
        <div className="square">F</div>
      </div>
      <button onClick={handleClick}>Shuffle</button>
    </div>
  );
};
