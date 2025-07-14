import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

const PricePicker = ({ value, onChange, error, helperText, required }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onChange(values.floatValue)}
      thousandSeparator
      decimalScale={2}
      fixedDecimalScale
      prefix="$"
      customInput={TextField}
      label="Price"
      margin="normal"
      fullWidth
      required={required}
      error={error}
      helperText={helperText}
    />
  );
};

export default PricePicker;
