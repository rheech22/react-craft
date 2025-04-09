import { useEffect, useRef, useState } from "react";
import "./App.css";

const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      console.log(`[info] debounced value is ${value}`);
      setDebouncedValue(value);
    }, delay);
    return () => {
      if (!timerRef?.current) return;
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return {
    debouncedValue,
  };
};

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const { debouncedValue } = useDebounce(inputValue, 1000);

  return (
    <div>
      <SearchInput
        value={inputValue}
        onChange={(value) => setInputValue(value)}
      />
      <div>
        <span>value: </span>
        {inputValue}
      </div>
      <div>
        <span>debouncedValue: </span>
        {debouncedValue}
      </div>
    </div>
  );
}

export default App;
