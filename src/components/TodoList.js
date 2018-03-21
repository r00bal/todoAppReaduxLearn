import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers'
import { fetchTodos} from './api';

fetchTodos('all').then(todos =>
  console.log(todos)
);

class VisibleTodoList extends React.Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
  }
  render() {
    return <TodoList {...this.props} />;
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

const mapStateToProps = (state, { match }) => ({
  const filter = match.params.filter || 'all';
  todos: getVisibleTodos(state, filter ),
  filter,
});

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//    dispatch(toggleTodo(id))
//  }
// })

const VisibleTodoList = withRouter(connect(
 mapStateToProps,
 {onTodoClick: toggleTodo}
)(VisibleTodoList));

export default VisibleTodoList;
