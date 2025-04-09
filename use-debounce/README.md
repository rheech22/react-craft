# 🧩 Create a useDebounce

## 📋 Task

Implement a custom hook useDebounce that delays updating a value until after a specified wait time has passed since the last change.

## ✅ Requirements

- The hook signature should be:

  ```ts
  function useDebounce<T>(value: T, delay: number): T;
  ```

- It should return the debounced version of value after the delay.
- Any change to value should reset the timer.
- Create a SearchInput component that:
- Displays both the current value and the debounced value.
- Logs the debounced value to the console when it updates.
