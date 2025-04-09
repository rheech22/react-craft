import { createContext, useContext, useReducer } from "react";
import "./App.css";

// domain
type Cart = {
  items: CartItem[];
};
type CartItem = {
  id: string;
  name: string;
  qunatity: number;
};

// context
type CartContext = Cart & {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};
const cartContext = createContext<CartContext | null>(null);

// reducer
type ActionType =
  | { type: "ADD_ITEM"; payload: { item: CartItem } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART"; payload?: undefined };
const reducer = (state: Cart, { type, payload }: ActionType) => {
  switch (type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, payload.item],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload.id),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// provider
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ items }, dispatch] = useReducer(reducer, { items: [] });

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: { item } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <cartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </cartContext.Provider>
  );
};

// view
const MyCart1 = () => {
  const conetxt = useContext(cartContext);

  if (!conetxt) return null;

  const { items, addItem, removeItem, clearCart } = conetxt;

  return (
    <div>
      <h1>My Cart v1</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.id}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addItem({ id: generatedId(conetxt), name: "Item", qunatity: 1 })
        }
      >
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

// entry
function App() {
  return (
    <CartProvider>
      <MyCart1 />
      <MyCart2 />
    </CartProvider>
  );
}

export default App;

// bonus
const useCart = () => {
  const conetxt = useContext(cartContext);
  if (!conetxt) throw new Error("useCart must be used within a CartProvider");
  return conetxt;
};

// view
const MyCart2 = () => {
  const { items, addItem, removeItem, clearCart } = useCart();

  return (
    <div>
      <h1>My Cart v2</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.id}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addItem({ id: generatedId({ items }), name: "Item", qunatity: 1 })
        }
      >
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

// helper
const generatedId = ({ items }: { items: CartItem[] }) => {
  if (items.length === 0) return "1";
  return (Number(items[items.length - 1].id) + 1).toString();
};
