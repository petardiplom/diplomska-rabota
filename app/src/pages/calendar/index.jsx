import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isBefore } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Paper } from "@mui/material";
import enGB from "date-fns/locale/en-GB";

import { useTheme } from "@mui/material/styles";
import Filters from "./Filters";
import { CalendarProvider, useCalendar } from "../../contexts/CalendarContext";
import FullScreenSpinner from "../../components/spinner/FullScreenSpinner";
import MonthEventComponent from "./eventComponents/MonthEventComponent";
import { useModal } from "../../contexts/ModalContext";

const locales = {
  enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const ReservationCalendar = () => {
  const {
    events,
    currentView,
    setCurrentView,
    currentDate,
    setCurrentDate,
    isLoading,
  } = useCalendar();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { openModal } = useModal();

  const handleSelectEvent = (event) => {
    const passedEvent = isBefore(new Date(event.start), new Date());
    if (passedEvent) {
      openModal("passedEvent", { event });
      return;
    }

    openModal("currentEvent", { event });
  };

  const handleSelectSlot = () => {
    openModal("createReservation");
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: "80vh" }}>
      {isLoading && <FullScreenSpinner open />}
      <Typography variant="h4" mb={3}>
        Reservation Calendar
      </Typography>

      <Box sx={{ display: "flex", height: "100%" }}>
        <Box width="200px" pr={2}>
          <Filters />
        </Box>

        <Box
          sx={{
            width: "calc(100% - 200px)",
            height: "calc(100% - 60px)",
            bgcolor: isDarkMode ? "#1e1e1e" : "background.paper",
            color: isDarkMode ? "#e0e0e0" : "text.primary",
            fontSize: "14px",
            fontWeight: 500,

            "& .rbc-toolbar": {
              backgroundColor: isDarkMode ? "#1f1f1f" : "#f5f5f5",
              color: isDarkMode ? "#ffffff" : "#000000",
              borderBottom: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
              button: {
                backgroundColor: isDarkMode ? "#2c2c2c" : "#fff",
                color: isDarkMode ? "#ddd" : "#333",
                border: "none",
                fontWeight: "600",
                margin: "0 4px",
                padding: "6px 12px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#3d3d3d" : "#e0e0e0",
                  cursor: "pointer",
                },
                "&.rbc-active": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
              },
            },

            "& .rbc-month-view, .rbc-time-view": {
              backgroundColor: isDarkMode ? "#1a1a1a" : "#fff",
            },

            "& .rbc-time-slot, & .rbc-day-bg, & .rbc-time-content > * + *": {
              borderColor: isDarkMode ? "#444" : "#ddd",
            },

            "& .rbc-today": {
              backgroundColor: isDarkMode ? "#263238" : "#eaf6ff",
            },

            "& .rbc-event": {
              borderRadius: "6px",
              minHeight: "40px",
              boxShadow: isDarkMode
                ? "0 0 8px 1px rgba(25, 118, 210, 0.6)"
                : "0 2px 5px rgba(0,0,0,0.15)",
            },
            "& .rbc-event-label": {
              fontWeight: "700",
            },
            "& .rbc-event-content": {
              whiteSpace: "normal",
            },

            "& .rbc-off-range-bg": {
              backgroundColor: isDarkMode ? "#121212" : "#f0f0f0",
            },

            "& .rbc-off-range": {
              color: isDarkMode ? "#999" : "#bbb",
            },

            "& .rbc-off-range-bg .rbc-event": {
              backgroundColor: isDarkMode ? "#444" : "#ccc",
              color: "#fff",
            },

            "& .rbc-month-view .rbc-day-bg:not(.rbc-off-range-bg)": {
              backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
            },
            "& .rbc-month-view .rbc-today, & .rbc-week-view .rbc-today": {
              backgroundColor: isDarkMode
                ? "#2a3b4d !important"
                : "#d0ebff !important",
            },

            "& .rbc-day-view .rbc-today": {
              backgroundColor: "inherit",
            },

            "& .rbc-timeslot-group": {
              borderBottom: isDarkMode ? "1px solid #2a2a2a" : "1px solid #eee",
            },

            "& .rbc-header": {
              borderRight: isDarkMode ? "1px solid #2a2a2a" : "1px solid #ccc",
            },
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            culture="enGB"
            date={currentDate}
            view={currentView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            defaultView="month"
            views={["month", "week", "day", "agenda"]}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            components={{
              month: {
                event: ({ event }) => <MonthEventComponent event={event} />,
              },
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
                color: "#fff",
                border: 0,
              },
            })}
            // popup
          />
        </Box>
      </Box>

      {/* <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedEvent ? "Event Details" : "Create New Event"}
        </DialogTitle>
        <DialogContent>
          {selectedEvent ? (
            <Box>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography>
                {selectedEvent.allDay
                  ? "All Day"
                  : `${safeFormat(selectedEvent.start, "PPpp")} - ${safeFormat(
                      selectedEvent.end,
                      "PPpp"
                    )}`}
              </Typography>
              <Typography>Type: {selectedEvent.resource.type}</Typography>
              <Typography>
                Location: {selectedEvent.resource.location}
              </Typography>
              <Typography>
                Participants: {selectedEvent.resource.participants.join(", ")}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                New Event: {safeFormat(newEvent?.start, "PPpp")} to{" "}
                {safeFormat(newEvent?.end, "PPpp")}
              </Typography>
              <input
                type="text"
                placeholder="Event title"
                value={newEvent?.title || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                style={{ width: "100%", padding: "8px", margin: "8px 0" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {!selectedEvent && (
            <Button
              onClick={handleSaveEvent}
              color="primary"
              disabled={!newEvent?.title?.trim()}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog> */}
    </Paper>
  );
};

const CalendarContainer = () => (
  <CalendarProvider>
    <ReservationCalendar />
  </CalendarProvider>
);
export default CalendarContainer;
