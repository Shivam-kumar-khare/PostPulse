import React from 'react'
import { useDispatch } from 'react-redux';
// import  authReducer  from '../../redux/authSlice.js';
import authService from '../../services/auth.services.js';
import { logout } from '../../redux/authSlice.js';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(
      () => {
        dispatch(logout());
      }
    )
  }
  return (
    <button onClick={logoutHandler}
      className='inline-block text-black px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'>
      Logout</button>
  )
}

export default LogoutBtn