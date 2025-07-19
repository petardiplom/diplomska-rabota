import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const MyTimePicker = (props) => {
  return (
    <TimePicker
      ampm={false}
      slotProps={{
        textField: {
          variant: "outlined",
          size: "small",
          error: props.error,
          helperText: props.error,
          required: true,
        },
      }}
      {...props}
    />
  );
};

export default MyTimePicker;
