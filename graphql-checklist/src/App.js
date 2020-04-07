import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        text
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    insert_todos(objects: { text: $text }) {
      returning {
        done
        id
        text
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todos(where: { id: { _eq: $id } }) {
      returning {
        done
        id
        text
      }
    }
  }
`;

// TODO: Add todos
// ✅: toggle todos
// TODO: delete todos
// TODO: list todos

function App() {
  const { loading, data, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => setTodoText(""),
  });
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [todoText, setTodoText] = useState("");

  const handleToggleTodo = async (todo) => {
    const data = await toggleTodo({
      variables: {
        id: todo.id,
        done: !todo.done,
      },
    });
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    if (!todoText.trim()) return;
    const data = await addTodo({
      variables: { text: todoText },
      refetchQueries: [{ query: GET_TODOS }],
    });
    setTodoText("");
  };

  const handleDeleteTodo = async ({ id }) => {
    const isConfirmed = window.confirm(
      "Do you really want to remove that item ?"
    );
    if (isConfirmed) {
      const data = await deleteTodo({
        variables: { id },
        update: (cache) => {
          const prevData = cache.readQuery({ query: GET_TODOS });
          const newTodos = prevData.todos.filter((todo) => todo.id !== id);
          cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
        },
      });
    }
  };

  if (loading)
    return (
      <div className="vh-100 code flex flex-column items-center bg-blue white pa3 fl-1">
        <h1 className="f2-l">
          <span role="img" aria-label="Loading text">
            😴
          </span>{" "}
          Loading...
        </h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>🌋Error on getting data!...</h1>
      </div>
    );

  return (
    <div className="vh-100 code flex flex-column items-center bg-blue white pa3 fl-1">
      <h1 className="f2-l">
        GraphQL CheckList{" "}
        <span role="img" aria-label="logo">
          🛫
        </span>{" "}
      </h1>
      <form onSubmit={handleAddTodo} className="mb-3">
        <input
          type="text"
          placeholder="Add next todo..."
          className="pa2 f4 b--dashed"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
        />
        <button type="submit" className="createButton">
          Create
        </button>
      </form>
      <div className="flex items-start justify-center flex-column">
        {data.todos.map((todo) => (
          <p key={todo.id} onDoubleClick={() => handleToggleTodo(todo)}>
            <span
              className={`pointer list pa1 f3 bg-green black ${
                todo.done && "strike"
              }`}
            >
              {todo.text}
            </span>
            <button
              className="deleteButton"
              onClick={() => handleDeleteTodo(todo)}
            >
              Delete item ❌
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
