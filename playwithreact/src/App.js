import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}

export default App;
