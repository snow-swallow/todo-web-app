import React, { Component } from "react";

class TodoItemView extends Component {
  // constructor (props) {
  //   super(props);

    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleToggle = this.handleToggle.bind(this);
  // }

  // handleToggle() {
  //   this.props.onToggle();
  // }

  // handleDelete() {
  //   this.props.onDelete();
  // }


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