import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";

const Autocomplete = ({
  options,
  value,
  onChange,
  error,
  helperText,
  label = "Autocomplete",
  size = "small",
  margin = "normal",
}) => {
  return (
    <MuiAutocomplete
      multiple
      options={options}
      onChange={onChange}
      value={value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size={size}
          margin={margin}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default Autocomplete;
