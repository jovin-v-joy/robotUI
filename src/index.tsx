import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import Home from './pages/Home';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  // <App />,
  <Home />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
