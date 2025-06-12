import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
// import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Edit from './Edit';
import CreateUser from './CreateUser';
import { LoginPage } from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Provider store={store}>
       
        <Routes>
            <Route path='/' element={<App />}></Route> 
            <Route path='/edit/:id' element={<Edit />}></Route>
            <Route path='/create_user' element={<CreateUser />}></Route>
            <Route path='/login_page' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignUpPage />}></Route>
          </Routes> 
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
