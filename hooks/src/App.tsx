import { useReducer } from "react";

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return forceUpdate;
};

const createMyReact = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _state: any[] = [];
  let cursor = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _depsList: any[] = [];

  const _effectQueue: (() => void)[] = [];

  const resetCursors = () => {
    cursor = 0;
  };

  const flushEffects = () => {
    while (_effectQueue.length) {
      const cb = _effectQueue.shift();
      cb?.();
    }
  };

  return {
    useState: <T,>(initialState: T): [T, (newValue: T) => void] => {
      const forceUpdate = useForceUpdate();
      const index = cursor;

      if (_state[index] === undefined) {
        _state[index] = initialState;
      }

      const setState = (newValue: T) => {
        _state[index] = newValue;
        resetCursors();
        forceUpdate();
        requestAnimationFrame(flushEffects);
      };

      const value = _state[index];
      cursor++;
      return [value, setState];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useEffect: (cb: () => void, deps: any[]) => {
      const index = cursor;
      if (_depsList[index] === undefined) {
        _depsList[index] = deps;
        _effectQueue.push(cb);
        cursor++;
        return;
      }

      const changed = _depsList[index].some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prev: any, i: number) => prev !== deps[i],
      );

      if (!changed) {
        cursor++;
        return;
      }

      _depsList[cursor] = deps;
      _effectQueue.push(cb);
      cursor++;
    },
  };
};

const MyReact = createMyReact();

const App = () => {
  const [count, setCount] = MyReact.useState(0);
  const [title, setTitle] = MyReact.useState("");

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleChange = (title: string) => {
    setTitle(title);
  };

  MyReact.useEffect(() => {
    console.log("initial effect !");
  }, []);

  MyReact.useEffect(() => {
    console.log("count effect !");
  }, [count]);

  MyReact.useEffect(() => {
    console.log("title effect !");
  }, [title]);

  MyReact.useEffect(() => {
    console.log("all effects !");
  }, [count, title]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>click</button>
      <input value={title} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
};

export default App;
