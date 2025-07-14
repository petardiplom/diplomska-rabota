import {
  Dashboard as DashboardIcon,
  AccountCircle,
  Logout,
  CalendarMonth,
  Apps,
  RestoreFromTrash,
  Recycling,
} from "@mui/icons-material";

export const getDrawerItems = (centerId) => {
  return [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: centerId ? `/centers/${centerId}/dashboard` : "/centers",
    },
    {
      text: "Calendar",
      icon: <CalendarMonth />,
      path: centerId ? `/centers/${centerId}/calendar` : "/centers",
    },
    {
      text: "Services",
      icon: <Apps />,
      path: centerId ? `/centers/${centerId}/services` : "/centers",
    },
    {
      text: "Archived",
      icon: <RestoreFromTrash />,
      children: [
        {
          text: "Services",
          path: centerId
            ? `/centers/${centerId}/services/archived`
            : "/centers",
          icon: <Recycling />,
        },
      ],
    },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];
};

export const getMinimalDrawerItems = () => {
  return [
    { text: "Centers", icon: <AccountCircle />, path: "/centers" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];
};
