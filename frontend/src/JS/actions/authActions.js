import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
  AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
  AUTH_LOGOUT,
} from '../constants/authConstants';
import { loginAPI, registerAPI } from '../../services/api';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    const { data } = await loginAPI({ email, password });
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({ type: AUTH_LOGIN_FAIL, payload: err.response?.data?.message || err.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: AUTH_REGISTER_REQUEST });
  try {
    const { data } = await registerAPI({ name, email, password });
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({ type: AUTH_REGISTER_FAIL, payload: err.response?.data?.message || err.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: AUTH_LOGOUT });
};