import React, { useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

const Parent = () => {
  const [result, setResult] = useState("");

  const handleCalculate = (a, b, operation) => {
    let res;
    switch (operation) {
      case "add":
        res = a + b;
        break;
      case "sub":
        res = a - b;
        break;
      case "mul":
        res = a * b;
        break;
      default:
        res = "Invalid Operation";
    }
    setResult(res);
  };

  return (
    <div>
      <h3>Parent</h3>
      <ChildA onCalculate={handleCalculate} />
      <ChildB result={result} />
    </div>
  );
};

export default Parent;
