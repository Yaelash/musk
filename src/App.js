import './App.css';
import React from 'react';
import {useRecoilState} from 'recoil';
import { isDarkModeState } from './state';
import { TweetsCloud } from './TweetsCloud';


function App() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  return (
    <div className="App" style={{ background: isDarkMode ? '#000' : '#fff' }}>
      <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ color: isDarkMode ? '#fff' : '#000' }}
          className="darkModeButton"
      >
        {isDarkMode ? 'Light'  : 'Dark '} Mode
      </button>
        <TweetsCloud/>
    </div>
  );
}

export default App;
