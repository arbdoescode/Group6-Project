import React from "react";

const TestVariable = (props) => {
  return (
    <div>
      <p onClick={props.click}>Hello {props.name}</p>
      <p>{props.children}</p>
      {/* <input type="text" onChange={props.changed}></input> */}
    </div>
  );
};

export default TestVariable;
