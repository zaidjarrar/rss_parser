import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GoogleMapsLoader from './components/GoogleMapsLoader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // using the GoogleMapsLoader to only load the script once on the initial launch
  <GoogleMapsLoader>
    <App />
  </GoogleMapsLoader>
);

reportWebVitals();
