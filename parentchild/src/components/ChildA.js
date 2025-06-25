import React, { useState } from "react";

const ChildA = ({ onCalculate }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleClick = (op) => {
    onCalculate(Number(input1), Number(input2), op);
  };

  return (
    <div>
      <h3>ChildA - Inputs</h3>
      <input
        type="number"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        placeholder="Input 1"
      />
      <input
        type="number"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Input 2"
      />
      <div>
        <button onClick={() => handleClick("add")}>+</button>
        <button onClick={() => handleClick("sub")}>-</button>
        <button onClick={() => handleClick("mul")}>*</button>
      </div>
    </div>
  );
};

export default ChildA;
