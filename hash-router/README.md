# 🧩 Build a Simple Client-Side HashRouter

## 📋 Task

Create a simple hash-based router without using any external libraries.

## ✅ Requirements

- Implement a Router component that:
  - Use `window.location.hash` to track the current route.
  - Re-renders when the hash changes.
- Implement a Route component:
  ```tsx
  <Route path="/home" component={<Home />} />
  ```
- Implement a Link component:
  ```tsx
  <Link to="/home">Go Home</Link>
  ```
- Example routes to support:
  - `/` -> renders `<Main />`
  - `/home` -> renders `<Home />`
  - `/about` -> renders `<About />`

## 🔥 Link

- [Click to see the implementation.](./src/JSXRouteVersion.tsx)
