import { createContext, useContext, useState } from "react";
import { useCalendarEvents } from "../hooks/apiHooks/useCalendarEvents";
import { useAuth } from "./AuthContext";
import { useCenter } from "./CenterContext";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const { user, authLoading } = useAuth();
  const { center } = useCenter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const {
    data: apiEvents,
    isLoading,
    error,
  } = useCalendarEvents(currentDate, {
    enabled: !!currentDate && !!user && !!center && !authLoading,
  });

  const transformedEvents = apiEvents?.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <CalendarContext.Provider
      value={{
        events: transformedEvents || [],
        currentDate,
        setCurrentDate,
        currentView,
        setCurrentView,
        isLoading,
        error,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
