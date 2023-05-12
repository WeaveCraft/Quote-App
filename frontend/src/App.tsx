import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { QuotePage } from './pages/Quote';

const HelloWorldList = styled('ul')`
  list-style-type: none;
  max-width:30rem;
  padding:0;
  margin:0;
  margin-top:1rem;
  background-color:#fff;
  display: flex;
  flex-wrap:wrap;
  gap: 1rem;
  li {
    padding: 1.6rem 3.2rem;
    transition: 200ms all ease;
    background-color:#300e66;
    max-width: 10rem;
    color: #fff;
    &:hover {
      transform:scale(1.05);
      transition: 200ms all ease;
    }
  }
},
`;

function App() {
  const navigate = useNavigate();

  const [count, setCount] = useState<number>(0);
  const [helloWorldList, setHelloWorldList] = useState<string[]>([]);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    setHelloWorldList(helloWorldList.concat(['hello world']));
  }, [count]);

  return (
    <div className="App">
      <Button variant="contained" onClick={handleIncrement}>
        Counter++++
      </Button>
      <Button variant="contained" onClick={() => navigate('/Quotes')}>
        Quote Page
      </Button>
      <div className="row">
        <div className="col-2">

        </div>
      </div>
      <HelloWorldList>
        {helloWorldList.map((hw, idx) => (
          <li key={idx}>{hw}</li>
        ))}
      </HelloWorldList>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Quotes" element={<QuotePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
