import { TextField, MenuItem } from "@mui/material";

const SelectOption = ({
  label,
  value,
  onChange,
  options = [],
  size = "small",
  ...props
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      size={size}
      sx={{
        "& .MuiSelect-select": {
          paddingTop: size === "small" ? "8.5px" : "16.5px",
          paddingBottom: size === "small" ? "8.5px" : "16.5px",
          paddingLeft: "14px",
          paddingRight: "32px",
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectOption;
