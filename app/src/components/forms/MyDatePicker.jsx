import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MyDatePicker = (props) => {
  return (
    <DatePicker
      format="dd/MM/yyyy"
      slotProps={{
        textField: {
          variant: "outlined",
          size: "small",
          label: props?.label || "Date",
          error: props?.error,
          helperText: props?.error,
          required: true,
        },
      }}
      {...props}
    />
  );
};

export default MyDatePicker;
