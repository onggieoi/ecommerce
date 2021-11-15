import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import NProgress from 'nprogress';

// import store from "src/redux/store";
import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import './styles/index.scss';

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
