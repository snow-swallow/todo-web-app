import React, { Component } from "react";
import "./style.css";

class TodoItemView extends Component {
  render() {
    const { item, onDelete, onToggle } = this.props;
    return (
      <li className={item.isDone ? 'todo-item green' : 'todo-item red'}>
        <span>{item.name}</span>
        {/* <button onClick={this.handleEdit}>Edit</button> */}
        <button onClick={onDelete}>Delete</button>
        <button onClick={onToggle}>Toggle</button>
      </li>
    );
  };
}

export default TodoItemView;