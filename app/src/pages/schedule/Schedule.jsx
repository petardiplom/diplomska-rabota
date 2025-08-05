import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Box,
  Divider,
  Grid,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import isEqual from "fast-deep-equal";
import cloneDeep from "lodash.clonedeep";
import MyTimePicker from "../../components/forms/MyTimePicker";
import {
  convertToDate,
  convertToString,
  validateSchedule,
} from "./scheduleUtils";
import { toast } from "react-toastify";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Schedule = ({ data, updateSchedule }) => {
  const [schedule, setSchedule] = useState([]);
  const [original, setOriginal] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (data) {
      const populated = convertToDate(data);
      setSchedule(populated);
      const clone = cloneDeep(populated);
      setOriginal(clone);
    }
  }, [data]);

  const handleDayChange = (index, updatedDay) => {
    const newSchedule = [...schedule];
    newSchedule[index] = updatedDay;
    setSchedule(newSchedule);
  };

  const handleBreakChange = (dayIdx, breakIdx, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].breaks[breakIdx][field] = value;
    setSchedule(newSchedule);
  };

  const addBreak = (dayIdx) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].breaks.push({ break_start: null, break_end: null });
    setSchedule(newSchedule);
  };

  const removeBreak = (dayIdx, breakIdx) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].breaks.splice(breakIdx, 1);
    setSchedule(newSchedule);
  };

  const handleSave = () => {
    const converted = convertToString(schedule);
    const { allErrors, hasAnyError } = validateSchedule(converted);
    setErrors(allErrors);

    if (hasAnyError) {
      toast.warn("Invalid input!");
      return;
    }

    updateSchedule({ data: converted });
  };

  const scheduleChanged = isEqual(schedule, original);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3}>
        <Box p={2} display="flex" alignItems="center">
          <Typography variant="h4">Schedule</Typography>
          {!scheduleChanged && (
            <Chip
              style={{ marginLeft: 8, marginTop: 6 }}
              label="Unsaved changes"
              color="warning"
              size="small"
            />
          )}
        </Box>
        <Box
          p={2}
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap={2}
        >
          {schedule.map((day, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" gutterBottom>
                    {dayNames[day.day_of_week - 1]}
                  </Typography>

                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontWeight: "500",
                      },
                    }}
                    control={
                      <Switch
                        checked={!day.is_closed}
                        onChange={(e) =>
                          handleDayChange(i, {
                            ...day,
                            is_closed: !e.target.checked,
                            work_start: null,
                            work_end: null,
                            breaks: [],
                          })
                        }
                      />
                    }
                    label={day.is_closed ? "Closed" : "Open"}
                  />
                </Box>

                {day.is_closed ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={4}
                  >
                    <EventBusyIcon color="disabled" sx={{ fontSize: 64 }} />
                    <Typography variant="h6" color="text.secondary" mt={1}>
                      Closed all day
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      mb={3}
                      mt={3}
                    >
                      <MyTimePicker
                        label="Start"
                        value={day.work_start}
                        onChange={(newValue) =>
                          handleDayChange(i, { ...day, work_start: newValue })
                        }
                        error={errors[i]?.work_start}
                      />
                      <MyTimePicker
                        label="End"
                        value={day.work_end}
                        onChange={(newValue) =>
                          handleDayChange(i, { ...day, work_end: newValue })
                        }
                        error={errors[i]?.work_end}
                      />
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle2">Breaks</Typography>
                      <IconButton
                        size="small"
                        disabled={day.breaks.length >= 2}
                        onClick={() => addBreak(i)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>

                    {day.breaks.map((brk, j) => (
                      <Grid
                        container
                        spacing={1}
                        alignItems="start"
                        key={j}
                        sx={{ mb: 1 }}
                        gap={2}
                      >
                        <Grid size={5}>
                          <MyTimePicker
                            label="From"
                            value={brk.break_start}
                            onChange={(val) =>
                              handleBreakChange(i, j, "break_start", val)
                            }
                            error={errors[i]?.breaks[j]?.break_start}
                          />
                        </Grid>
                        <Grid size={5}>
                          <MyTimePicker
                            label="To"
                            value={brk.break_end}
                            onChange={(val) =>
                              handleBreakChange(i, j, "break_end", val)
                            }
                            error={errors[i]?.breaks[j]?.break_end}
                          />
                        </Grid>
                        <Grid size={1} mt={0.8}>
                          <IconButton
                            size="small"
                            onClick={() => removeBreak(i, j)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={scheduleChanged}
            onClick={handleSave}
          >
            Save Schedule
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default Schedule;
