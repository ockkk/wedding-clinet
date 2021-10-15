import React, { useEffect } from 'react';
import { Main } from './main/Main';
import { Impormation } from './information/Information';
import { Calender } from './calender/Calender';
import { Gellery } from './gellery/Gellery';
import { Map } from './map/Map';
import { AccountNumber } from './accountNumber/AccountNumber';
import { Comment } from './comment/Comment';
import './App.css';
import './firebase/firebase';

function App() {

  return (
    <div className="App">
      <div className="intro-wrap">

      </div>
      <div className="body-wrap">
        <Main />
        <Impormation />
        <Calender />
        <Gellery />
        <Map />
        <AccountNumber />
        <Comment />
      </div>
    </div>
  );
}

export default App;
