import _ from "lodash";
import "./index.css";

function component() {
  const element = document.createElement("div");

  element.classList.add("hello");

  return element;
}

function Render() {
  const tasks = [
    {
      description: "Buy groceries",
      completed: false,
      index: 1,
    },
    {
      description: "Clean the house",
      completed: true,
      index: 2,
    },
    {
      description: "Finish homework",
      completed: false,
      index: 3,
    },
    {
      description: "Go for a walk",
      completed: false,
      index: 4,
    },
  ];
  function sortTasksByIndex() {
    tasks.sort((a, b) => a.index - b.index);
  }
  function populateTodoList() {
    const todoList = document.getElementById("todoList");

    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task.description;
      if (task.completed) {
        listItem.style.textDecoration = "line-through";
      }
      todoList.appendChild(listItem);
    });
  }
  sortTasksByIndex();
  populateTodoList();
}
Render();
document.body.appendChild(component());
