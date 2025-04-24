# 🧩 Recreate a Simplified React Hook APIs

## 📋 Task

Recreate a simplified version of React's Hook APIs

## ✅ Requirements

### useState

- The `useState` function should retrun an array with two elements.
  - The current state value.
  - A function to update the state>
- State values must persist between multiple calls to the function that uses `useState`.
- (Bonus) When the state is updated, your implementation should simulate a re-render.
- (Bonus) It's possible to use `useState` more than once in the same function.

### useEffect

- The `useEffect` function should accept two arguments.
  - A callback function (effect) to be executed after rendering.
  - A dependency array (deps) thata determines when the effect should run.
- On ther first render, the effect callback must always be executed.
- On subsequent renders, the effect must only run if any value in the dependency array has changed since the previous render.
- It must be possible to call useEffect multiple times in the same function, and each should track its own dependencies and cleanup independently.
- (Bonus) The effect callback may optionally return a cleanup function.
  - This cleanup function must be called before the next execution of the same effect. (if dependencies changed).
  - It must also be called when the component is unmounted, if it hasn't already been cleaned up.
- (Bonus) Effects should not block rendering, but instead run asynchronously after the rendering process completes (e.g., using requestAnimationFrame or a microtask).

## 🔥 Link

- [useState/useEffect](./src/App.tsx)

## ✨ References

- [https://jeonghwan-kim.github.io](https://jeonghwan-kim.github.io/)
