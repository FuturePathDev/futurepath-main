import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
