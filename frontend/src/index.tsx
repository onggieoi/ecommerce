import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import NProgress from 'nprogress';

import './index.css';
// import AppTest from './App';
import reportWebVitals from './reportWebVitals';
// import store from "src/redux/store";
import Routes from "./routes";


NProgress.configure({ minimum: 1 });

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    // </Provider>
  );
}

const ROOT = document.getElementById('root');
ReactDOM.render(<App />, ROOT);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
