import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RecoilRoot>
          <React.Suspense fallback={<div className="loading">Loading tweets cloud...</div>}>
            <App />
          </React.Suspense>
      </RecoilRoot>

  </React.StrictMode>
);

reportWebVitals();
