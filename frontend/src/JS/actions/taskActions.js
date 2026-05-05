import {
  TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL,
  TASK_CREATE_SUCCESS, TASK_UPDATE_SUCCESS,
  TASK_DELETE_SUCCESS, TASK_SELECT,
} from '../constants/taskConstants';
import { getTasksAPI, createTaskAPI, updateTaskAPI, deleteTaskAPI } from '../../services/api';

export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: TASK_LIST_REQUEST });
  try {
    const { data } = await getTasksAPI();
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: TASK_LIST_FAIL, payload: err.response?.data?.message || err.message });
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const { data } = await createTaskAPI(taskData);
    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    return data;
  } catch (err) { console.error('createTask error:', err.response?.data?.message || err.message); }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    const { data } = await updateTaskAPI(id, taskData);
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
    return data;
  } catch (err) { console.error('updateTask error:', err.response?.data?.message || err.message); }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await deleteTaskAPI(id);
    dispatch({ type: TASK_DELETE_SUCCESS, payload: id });
  } catch (err) { console.error('deleteTask error:', err.response?.data?.message || err.message); }
};

export const selectTask = (task) => ({ type: TASK_SELECT, payload: task });