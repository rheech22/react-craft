import { animate, createScope, Scope, stagger, utils } from "animejs";
import { useEffect, useRef } from "react";

import "./stagger.css";

export const Stagger = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const $squares = utils.$(".square");

    scope.current = createScope({ root }).add(() => {
      animate($squares, {
        scale: [{ to: [0, 1.25] }, { to: 1 }],
        boxShadow: [
          { to: "0 0 1rem 0 currentColor" },
          { to: "0 0 0rem 0 currentColor" },
        ],
        delay: stagger(100, {
          grid: [11, 4],
        }),
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className="stagger">
      <div className="small justified row">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="small justified row">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="small justified row">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="small justified row">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
};
