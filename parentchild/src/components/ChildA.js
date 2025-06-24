import React from "react";

const ChildA = ({ onTextChange }) => {
  return (
    <div>
      <h3>ChildA input</h3>
      <input type="text" onChange={(e) => onTextChange(e.target.value)}></input>
    </div>
  );
};

export default ChildA;
