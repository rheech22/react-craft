import { ReactElement, useEffect, useState } from "react";
import "./App.css";

// event emitter
type MyContextEventHandler<T> = (value: T) => void;
type EventEmitter<T> = {
  on: (handler: MyContextEventHandler<T>) => void;
  off: (handler: MyContextEventHandler<T>) => void;
  get: () => T;
  set: (newValue: T) => void;
};
const createEventEmitter = <T,>(value: T): EventEmitter<T> => {
  const handlers: MyContextEventHandler<T>[] = [];
  return {
    on: (handler: MyContextEventHandler<T>) => {
      handlers.push(handler);
    },
    off: (handler: MyContextEventHandler<T>) => {
      handlers.filter((h) => h !== handler);
    },
    get: () => {
      return value;
    },
    set: (newValue: T) => {
      value = newValue;
      handlers.forEach((h) => h(value));
    },
  };
};

// context api
type MyContext<T> = {
  emitter: EventEmitter<T>;
  Provider: (props: { state: T; children: React.ReactNode }) => ReactElement;
};
const createContext = <T,>(initialState: T): MyContext<T> => {
  const emitter = createEventEmitter(initialState);

  const Provider = (props: { state: T; children: React.ReactNode }) => {
    useEffect(() => {
      emitter.set(props.state);
    }, [props.state]);
    return <>{props.children}</>;
  };

  return { Provider, emitter };
};

const useContext = <T,>(context: MyContext<T>) => {
  const [state, setState] = useState<T>(context.emitter.get());

  useEffect(() => {
    const handler = (value: T) => setState(value);
    context.emitter.on(handler);
    return () => context.emitter.off(handler);
  }, [context]);

  if (state === null) {
    throw Error("No State");
  }

  return state;
};

// todo context
type Todo = {
  id: number;
  title: string;
};
type TodoDataContextState = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
};
const TodoContext = createContext<TodoDataContextState>({
  todos: [],
  addTodo: () => ({}),
  deleteTodo: () => ({}),
});

// providers
const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (title: string) => {
    setTodos((prev) => [
      ...prev,
      { title, id: todos.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <TodoContext.Provider state={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// view
const TodoList = () => {
  console.log("Rendered TodoList");
  const { todos, deleteTodo } = useContext(TodoContext);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

const TodoForm = () => {
  console.log("Rendered TodoForm");
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

// entry
function NotOptimizedVersionApp() {
  return (
    <TodoContextProvider>
      <TodoForm />
      <TodoList />
    </TodoContextProvider>
  );
}

export default NotOptimizedVersionApp;
