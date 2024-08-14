import { useState, useEffect } from "react";

function Test() {
  const [count, Setcount] = useState(5);
  const handleChange = (value) => {
    Setcount(value);
  };
  return (
    <>
      <input
        type="number"
        value={count}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        style={{ height: `${count}px` }}
      />
      <input type="number" value={count} style={{ height: `${count}px` }} />
    </>
  );
}

export default Test;
