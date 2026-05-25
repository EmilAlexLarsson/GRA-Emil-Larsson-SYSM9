import React, { useState } from "react";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    reset: () => setValue(initialValue),
  };
}

export default useInput;
