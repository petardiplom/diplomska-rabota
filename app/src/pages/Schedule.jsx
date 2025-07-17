import React, { useEffect, useState } from "react";
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
  CardActions,
  Paper,
  CircularProgress,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useCenterSchedule } from "../hooks/apiHooks/useCenterSchedule";

function timeStringToDate(timeStr) {
  if (!timeStr) return null;
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return new Date(0, 0, 0, hours, minutes, seconds || 0);
}

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  const { data, isLoading, isError, refetch } = useCenterSchedule();

  useEffect(() => {
    if (data) {
      const populated = data.map((day) => {
        return {
          ...day,
          is_closed: day.is_closed,
          work_start: day.work_start ? timeStringToDate(day.work_start) : null,
          work_end: day.work_end ? timeStringToDate(day.work_end) : null,
          breaks: day.breaks.map((brk) => ({
            break_start: timeStringToDate(brk.break_start),
            break_end: timeStringToDate(brk.break_end),
          })),
        };
      });
      setSchedule(populated);
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

  if (isLoading) {
    return (
      <Paper elevation={3}>
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress size={32} />
        </Box>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper elevation={3}>
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Box textAlign="center">
            <div>⚠️ Failed to load data.</div>
            <div style={{ fontSize: 14, color: "#666" }}>
              Please try again later.
            </div>
            <Box mt={2}>
              <button onClick={() => refetch()}>Retry</button>
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={2}
      >
        {schedule.map((day, i) => (
          <Card
            key={i}
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
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
                  mt={3}
                >
                  <EventBusyIcon color="disabled" sx={{ fontSize: 64 }} />
                  <Typography variant="h6" color="text.secondary" mt={1}>
                    Closed all day
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box display="flex" alignItems="center" gap={2} mb={3} mt={3}>
                    <TimePicker
                      label="Start"
                      value={day.work_start}
                      onChange={(newValue) =>
                        handleDayChange(i, { ...day, work_start: newValue })
                      }
                      slotProps={{
                        textField: { variant: "outlined", size: "small" },
                      }}
                    />
                    <TimePicker
                      label="End"
                      value={day.work_end}
                      onChange={(newValue) =>
                        handleDayChange(i, { ...day, work_end: newValue })
                      }
                      slotProps={{
                        textField: { variant: "outlined", size: "small" },
                      }}
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
                      alignItems="center"
                      key={j}
                      sx={{ mb: 1 }}
                      gap={2}
                    >
                      <Grid size={5}>
                        <TimePicker
                          label="From"
                          value={brk.break_start}
                          onChange={(val) =>
                            handleBreakChange(i, j, "break_start", val)
                          }
                          slotProps={{
                            textField: { variant: "outlined", size: "small" },
                          }}
                        />
                      </Grid>
                      <Grid size={5}>
                        <TimePicker
                          label="To"
                          value={brk.break_end}
                          onChange={(val) =>
                            handleBreakChange(i, j, "break_end", val)
                          }
                          slotProps={{
                            textField: { variant: "outlined", size: "small" },
                          }}
                        />
                      </Grid>
                      <Grid size={1}>
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
            <CardActions>
              <Box ml="auto">
                <Button size="small">Save</Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>
    </LocalizationProvider>
  );
};

export default Schedule;
