import React, { Component } from "react";
import TodoItemView from './components/TodoItemView';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as todoActions, fetchAllTodoList } from '../../redux/modules/todos';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllTodoList();
  }

  handleDelete() {
    this.props.deleteTodo();
  }

  handleToggle() {
    this.props.toggleTodo();
  }

  handleChangeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleReset() {
    this.setState({
      value: ''
    });
  }

  handleCreate(e) {
    this.props.createTodo({
      value: e.target.value
    });
  }

  render() {
    console.log(this.props);
    const todoList = this.props.todoList || [];
    return (
      <div>
        <div>
          <input 
            type="text"
            name="goal"
            onChange={this.handleChangeInput}
          />
          <button onClick={this.handleCreate}>Create</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <ul>
          {todoList ? todoList.map(item => {
            return <TodoItemView 
              key={item.id}
              item={item} 
              onDelete={this.handleDelete}
              onToggle={this.handleToggle}
            />
          }) : null}
        </ul>
      </div>
    );
  };
}


const mapStateToProps = (state, props) => {
  return {
    todoList: fetchAllTodoList(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);