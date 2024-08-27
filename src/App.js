import React from 'react';
import './App.css';
import SignIn from './googleSignIn/SignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <SignIn/>
      <ToastContainer />
    </div>
  );
}

export default App;
