import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addHours, addDays, startOfHour, isValid } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import enUS from 'date-fns/locale/en-US';

import { useTheme } from '@mui/material/styles';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const generateDummyReservations = () => {
    const now = new Date();
    const today = startOfHour(now);

    return [
        {
            id: 1,
            title: 'Team Meeting',
            start: addHours(today, 2),
            end: addHours(today, 3),
            allDay: false,
            resource: {
                type: 'meeting',
                participants: ['John', 'Jane'],
                location: 'Room 101'
            }
        },
        {
            id: 2,
            title: 'Lunch Appointment',
            start: addDays(addHours(today, 12), 1),
            end: addDays(addHours(today, 13), 1),
            allDay: false,
            resource: {
                type: 'meal',
                participants: ['Client'],
                location: 'Downtown Cafe'
            }
        }
    ];
};

const safeFormat = (date, formatStr) => {
    return isValid(date) ? format(date, formatStr) : 'Invalid date';
};

const ReservationCalendar = () => {
    const [events, setEvents] = useState(generateDummyReservations());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const handleSelectEvent = (event) => {
        if (isValid(event.start) && isValid(event.end)) {
            setSelectedEvent(event);
            setDialogOpen(true);
        }
    };

    const handleSelectSlot = (slotInfo) => {
        if (isValid(slotInfo.start) && isValid(slotInfo.end)) {
            setNewEvent({
                start: slotInfo.start,
                end: slotInfo.end,
                title: '',
                resource: {
                    type: 'general',
                    participants: [],
                    location: ''
                }
            });
            setDialogOpen(true);
        }
    };

    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleViewChange = (newView) => {
        setCurrentView(newView);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
        setNewEvent(null);
    };

    const handleSaveEvent = () => {
        if (newEvent && newEvent.title.trim() && isValid(newEvent.start) && isValid(newEvent.end)) {
            const eventToAdd = {
                ...newEvent,
                id: Math.max(...events.map(e => e.id), 0) + 1,
                allDay: false
            };
            setEvents([...events, eventToAdd]);
            handleCloseDialog();
        }
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            setEvents(events.filter(event => event.id !== selectedEvent.id));
            handleCloseDialog();
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 2, height: '80vh' }}>
            <Typography variant="h5" gutterBottom>
                Reservation Calendar
            </Typography>

            <Box
                sx={{
                    height: 'calc(100% - 60px)',
                    bgcolor: isDarkMode ? '#1e1e1e' : 'background.paper',
                    color: isDarkMode ? '#e0e0e0' : 'text.primary',
                    fontSize: '14px',
                    fontWeight: 500,

                    // Toolbar buttons
                    '& .rbc-toolbar': {
                        backgroundColor: isDarkMode ? '#1f1f1f' : '#f5f5f5',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        borderBottom: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
                        button: {
                            backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
                            color: isDarkMode ? '#ddd' : '#333',
                            border: 'none',
                            fontWeight: '600',
                            margin: '0 4px',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: isDarkMode ? '#3d3d3d' : '#e0e0e0',
                                cursor: 'pointer',
                            },
                            '&.rbc-active': {
                                backgroundColor: '#1976d2',
                                color: '#fff',
                            },
                        },
                    },

                    // Calendar background
                    '& .rbc-month-view, .rbc-time-view': {
                        backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                    },

                    // Grid borders
                    '& .rbc-time-slot, & .rbc-day-bg, & .rbc-time-content > * + *': {
                        borderColor: isDarkMode ? '#444' : '#ddd',
                    },

                    // Today's background
                    '& .rbc-today': {
                        backgroundColor: isDarkMode ? '#263238' : '#eaf6ff',
                    },

                    // Events
                    '& .rbc-event': {
                        borderRadius: '6px',
                        boxShadow: isDarkMode
                            ? '0 0 8px 1px rgba(25, 118, 210, 0.6)'
                            : '0 2px 5px rgba(0,0,0,0.15)',
                    },
                    '& .rbc-event-label': {
                        fontWeight: '700',
                    },
                    '& .rbc-event-content': {
                        whiteSpace: 'normal',
                    },

                    // 🔴 Off-range day CELL (full cube background)
                    '& .rbc-off-range-bg': {
                        backgroundColor: isDarkMode ? '#121212' : '#f0f0f0',
                    },

                    // 🔴 Off-range text styling (date number)
                    '& .rbc-off-range': {
                        color: isDarkMode ? '#999' : '#bbb',
                    },

                    // Events inside off-range days (dimmed)
                    '& .rbc-off-range-bg .rbc-event': {
                        backgroundColor: isDarkMode ? '#444' : '#ccc',
                        color: '#fff',
                    },

                    // ✅ In-range day cell background (normal days)
                    '& .rbc-month-view .rbc-day-bg:not(.rbc-off-range-bg)': {
                        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                    },
                    '& .rbc-month-view .rbc-today, & .rbc-week-view .rbc-today': {
                        backgroundColor: isDarkMode ? '#2a3b4d !important' : '#d0ebff !important', // subtle blue highlight
                    },

                    '& .rbc-day-view .rbc-today': {
                        backgroundColor: 'inherit', // remove background in day view
                    },

                    '& .rbc-timeslot-group': {
                        borderBottom: isDarkMode ? '1px solid #2a2a2a' : '1px solid #eee',
                    },

                    '& .rbc-header': {
                        // borderBottom: isDarkMode ? '1px solid #2a2a2a' : '1px solid #ccc',
                        borderRight: isDarkMode ? '1px solid #2a2a2a' : '1px solid #ccc',
                    },
                    
                }}
            >
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    date={currentDate}
                    view={currentView}
                    onNavigate={handleNavigate}
                    onView={handleViewChange}
                    defaultView="month"
                    views={['month', 'week', 'day', 'agenda']}
                    selectable
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor:
                                event.resource.type === 'meeting' ? '#1976d2' :
                                    event.resource.type === 'meal' ? '#2e7d32' :
                                        '#c62828',
                            color: '#fff',
                            border: 0,
                        },
                    })}
                />
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    {selectedEvent ? 'Event Details' : 'Create New Event'}
                </DialogTitle>
                <DialogContent>
                    {selectedEvent ? (
                        <Box>
                            <Typography variant="h6">{selectedEvent.title}</Typography>
                            <Typography>
                                {selectedEvent.allDay ? 'All Day' :
                                    `${safeFormat(selectedEvent.start, 'PPpp')} - ${safeFormat(selectedEvent.end, 'PPpp')}`
                                }
                            </Typography>
                            <Typography>Type: {selectedEvent.resource.type}</Typography>
                            <Typography>Location: {selectedEvent.resource.location}</Typography>
                            <Typography>
                                Participants: {selectedEvent.resource.participants.join(', ')}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">
                                New Event: {safeFormat(newEvent?.start, 'PPpp')} to {safeFormat(newEvent?.end, 'PPpp')}
                            </Typography>
                            <input
                                type="text"
                                placeholder="Event title"
                                value={newEvent?.title || ''}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                style={{ width: '100%', padding: '8px', margin: '8px 0' }}
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
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    {!selectedEvent && (
                        <Button onClick={handleSaveEvent} color="primary" disabled={!newEvent?.title?.trim()}>
                            Save
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ReservationCalendar;