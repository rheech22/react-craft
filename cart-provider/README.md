# 🧩 Global State Management with Context + Reducer

## 📋 Task

Implement a shopping cart feature using React’s Context API and useReducer.

## ✅ Requirements

- Create a CartProvider with useReducer for state management.
- The state structure should be:
  ```ts
  {
    items: {
      id: string;
      name: string;
      quantity: number;
    }
    [];
  }
  ```
- Support the following actions:
  - `ADD_ITEM`: Add an item to the cart (increment quantity if already added).
  - `REMOVE_ITEM`: Remove an item by its id.
  - `CLEAR_CART`: Reset the cart to an empty state.
- Create a child component Cart to:
  - Add items to the cart
  - Display the current list of items
  - Clear the cart

## ⭐ Bonus

- Create a custom hook `useCart()` to encapsulate context access.

## 🔥 Link

- [Click to see the implementation.](./src/App.tsx)
