import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import FetchError from './FetchError.js';



class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
     fetchTodos(filter).then(() => console.log('done'));

  }
  render() {
    const { isFetching, errorMessage, toggleTodo, todos} = this.props;
    if (isFetching && !todos.length ) {
      return <p>Loading... </p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick ={toggleTodo}
      />
    );
  }
}


const Todo = ({
 onClick,
 completed,
 text
}) => (
 <li
   onClick= {onClick}
   style= {{
     textDecoration: completed ? 'line-through' : 'none'
   }}>
   {text}
 </li>
);

const TodoList = ({
 todos,
 onTodoClick
}) => (

 <ul>

   {todos.map(todo =>
     <Todo
       key={todo.id}
       {...todo}
       onClick={() => onTodoClick(todo.id)}
     />
   )}
 </ul>
)

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
  isFetching: getIsFetching(state, filter),
  errorMessage: getErrorMessage(state, filter),
  todos: getVisibleTodos(state, filter ),
  filter,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//    dispatch(toggleTodo(id))
//  }
// })

 VisibleTodoList = withRouter(connect(
 mapStateToProps,
 actions,
)(VisibleTodoList));

export default VisibleTodoList;
