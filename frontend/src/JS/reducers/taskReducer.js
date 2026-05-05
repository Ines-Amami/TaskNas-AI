import {
  TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL,
  TASK_CREATE_SUCCESS, TASK_UPDATE_SUCCESS,
  TASK_DELETE_SUCCESS, TASK_SELECT,
} from '../constants/taskConstants';

const init = { loading: false, tasks: [], selectedTask: null, error: null };

export const taskReducer = (state = init, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case TASK_LIST_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case TASK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TASK_CREATE_SUCCESS:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case TASK_UPDATE_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(t => t._id === action.payload._id ? action.payload : t),
        selectedTask: state.selectedTask?._id === action.payload._id ? action.payload : state.selectedTask,
      };
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(t => t._id !== action.payload),
        selectedTask: state.selectedTask?._id === action.payload ? null : state.selectedTask,
      };
    case TASK_SELECT:
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
};