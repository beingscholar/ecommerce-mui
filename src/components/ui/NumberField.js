import React, { useState } from "react";
import { InputBase, Button, Box } from "@material-ui/core";

export default function NumberField(props) {
  const [myValue, mySetValue] = useState(0);
  const value = props.value ?? myValue;
  const setValue = props.onChange ?? mySetValue;

  const onAddClick = () => {
    if (props.maxValue && value >= props.maxValue) {
      // Throw error
      return;
    }
    setValue(value + 1);
  };

  const onSubtractClick = () => {
    if (props.minValue && value <= props.minValue) {
      // Throw error
      return;
    }
    setValue(value - 1);
  };

  const onChange = (newValue) => {
    if (newValue < props.minValue) {
      setValue(props.minValue ?? 0);
    } else if (newValue > props.maxValue) {
      setValue(props.maxValue ?? 0);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box style={props.style} className="number-field">
      <Button
        onClick={onSubtractClick}
        className="remove-quantity"
        disabled={value <= props.minValue}
      >
        -
      </Button>
      <InputBase
        onChange={(e) => onChange(e.target.value)}
        value={value}
        // inputProps={{ style: { textAlign: "center" } }}
        // style={{ width: "20px" }}
      />
      <Button
        onClick={onAddClick}
        className="add-quantity"
        disabled={value >= props.maxValue}
      >
        +
      </Button>
    </Box>
  );
}
