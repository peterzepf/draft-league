import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState({ test: 'fail' });
  useEffect(() => {
    fetch('/api/')
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(info => {
        console.log(info);
        return setData(info);
      });
  }, []);
  return (
    <div>
      <h1> {data.test} </h1>
    </div>
  );
};

export default App;
