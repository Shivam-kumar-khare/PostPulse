import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './services/auth.services.js';
import { login, logout } from './redux/authSlice.js';
import { Header, Footer, Container } from "./components/index.js";
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(!true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getAccount()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .catch((e)=>{throw Error("User Data Cannot be fetched")})
      .finally(() => setLoading(false))
  }, [])
  console.log("loading status", loading)
  if (loading) {
    return (
      <>
        <div className='w-full py-8'>
          <Container>
            <p className='font-bold text-center'>Loading...</p>
          </Container>
        </div>
      </>
    )
  }
  else {
    return (
      <>

        <Header />
        <Outlet></Outlet>
        <div className='relative w-full bottom-0'><Footer /></div>

      </>
    )
  }
}

export default App
