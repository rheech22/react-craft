import { animate, createScope, Scope, stagger, utils } from "animejs";
import { useEffect, useRef } from "react";

import "./shuffle.css";

export const Shuffle = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const squares = utils.$(".square");

    scope.current = createScope({ root }).add((scope) => {
      const x = stagger("100%", { grid: [6, 2], axis: "x" });
      const y = stagger("100%", { grid: [6, 2], axis: "y" });

      utils.set(squares, { x, y });

      scope.add("shuffle", () => {
        animate(utils.shuffle(squares), { x, y });
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
        <div className="square">G</div>
        <div className="square">H</div>
        <div className="square">I</div>
        <div className="square">J</div>
        <div className="square">K</div>
        <div className="square">L</div>
      </div>
      <button onClick={handleClick}>Shuffle</button>
    </div>
  );
};

//useEffect(() => {
//  const squares = utils.$(".square");
//
//  const cols = 6;
//  const squareSize = 48;
//  const gap = 5;
//  const totalSquareSize = squareSize + gap;
//  const getX = (i: number): number => {
//    return (i % cols) * totalSquareSize;
//  };
//
//  const getY = (i: number): number => {
//    return Math.floor(i / cols) * totalSquareSize;
//  };
//
//  scope.current = createScope({ root }).add((scope) => {
//    utils.set(squares, {
//      x: (_: unknown, i: number) => getX(i),
//      y: (_: unknown, i: number) => getY(i),
//    });
//
//    scope.add("shuffle", () => {
//      animate(utils.shuffle(squares), {
//        x: (_: unknown, i: number) => getX(i),
//        y: (_: unknown, i: number) => getY(i),
//      });
//    });
//  });
//
//  return () => scope.current?.revert();
//}, []);
