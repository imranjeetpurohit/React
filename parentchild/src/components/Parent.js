import React, { useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

const Parent = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <h3>Parent</h3>
      <ChildA onTextChange={setText} />
      <ChildB value={text} />
    </div>
  );
};

export default Parent;
