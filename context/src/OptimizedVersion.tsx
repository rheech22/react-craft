import { ReactElement, useEffect, useMemo, useReducer, useState } from "react";
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
type TodoListContextState = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
};
const TodoListContext = createContext<TodoListContextState>({
  todos: [],
  deleteTodo: () => ({}),
});
type TodoFormContextState = {
  addTodo: (title: string) => void;
};
const TodoFormContext = createContext<TodoFormContextState>({
  addTodo: () => ({}),
});
type State = {
  todos: Todo[];
};
type Action =
  | { type: "ADD_TODO"; payload: { title: string } }
  | { type: "DELETE_TODO"; payload: { id: number } };
const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: payload.title,
            id: state.todos.length
              ? state.todos[state.todos.length - 1].id + 1
              : 1,
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
  }
};

// providers
const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const formState = useMemo(
    () => ({
      addTodo: (title: string) => {
        dispatch({ type: "ADD_TODO", payload: { title } });
      },
    }),
    [],
  );
  const listState = useMemo(
    () => ({
      todos: state.todos,
      deleteTodo: (id: number) => {
        dispatch({ type: "DELETE_TODO", payload: { id } });
      },
    }),
    [state.todos],
  );
  return (
    <TodoFormContext.Provider state={formState}>
      <TodoListContext.Provider state={listState}>
        {children}
      </TodoListContext.Provider>
    </TodoFormContext.Provider>
  );
};

// view
const TodoList = () => {
  console.log("Rendered TodoList");
  const { todos, deleteTodo } = useContext(TodoListContext);

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
  const { addTodo } = useContext(TodoFormContext);

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
function OptimizedVersionApp() {
  return (
    <TodoContextProvider>
      <TodoForm />
      <TodoList />
    </TodoContextProvider>
  );
}

export default OptimizedVersionApp;
