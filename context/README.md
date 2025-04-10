# 🧩 Recreate a Simplified Context API

## 📋 Task

Recreate a simplified version of React's context API.

## ✅ Requirements

- Implement a `createContext` function that returns a custom `Provider` ans `useContext`
- Your Provider must use React's internal features (like state or reducer) to hold and update values.
- The value from the `Provider` must be accessible from any nested component using use custom `useContext`

```tsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider state="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>The current theme is {theme}</div>;
}
```

## ⭐ Bonus

- Support nested providers with different values.
- Optimize a render tree via seperation of context.

## 🔥 Link

- [Click to see the implementation. (Not Optimized)](./src/NotOptimizedVersion.tsx)
- [Click to see the implementation. (Optimized)](./src/OptimizedVersion.tsx)

## ✨ References

- https://jeonghwan-kim.github.io/dev/2022/04/28/use-context.html
- https://www.developerway.com/posts/how-to-write-performant-react-apps-with-context#part4
