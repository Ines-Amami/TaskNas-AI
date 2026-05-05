import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL,
  AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL,
  AUTH_LOGOUT,
} from '../constants/authConstants';

const saved = localStorage.getItem('userInfo');
const init  = { loading: false, userInfo: saved ? JSON.parse(saved) : null, error: null };

export const authReducer = (state = init, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case AUTH_LOGIN_FAIL:
    case AUTH_REGISTER_FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case AUTH_LOGOUT:
      return { loading: false, userInfo: null, error: null };
    default:
      return state;
  }
};