import {
  Dashboard as DashboardIcon,
  AccountCircle,
  Logout,
  CalendarMonth,
  Apps,
  RestoreFromTrash,
  Recycling,
  Schedule,
  Hub,
  Feed,
  Collections,
  Groups,
  Group,
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
      text: "Customers",
      icon: <Group />,
      path: centerId ? `/centers/${centerId}/customers` : "/centers",
    },
    {
      text: "Services",
      icon: <Apps />,
      path: centerId ? `/centers/${centerId}/services` : "/centers",
    },
    {
      text: "Staff",
      icon: <Groups />,
      path: centerId ? `/centers/${centerId}/staff` : "/centers",
    },
    {
      text: "Schedule",
      icon: <Schedule />,
      path: centerId ? `/centers/${centerId}/schedule` : "/centers",
    },

    {
      text: "Gallery",
      icon: <Collections />,
      path: centerId ? `/centers/${centerId}/gallery` : "/centers",
    },
    {
      text: "General information",
      icon: <Feed />,
      path: centerId ? `/centers/${centerId}/general-information` : "/centers",
    },
    {
      text: "Archived",
      icon: <RestoreFromTrash />,
      children: [
        {
          text: "Customers",
          path: centerId
            ? `/centers/${centerId}/customers/archived`
            : "/centers",
          icon: <Recycling />,
        },
        {
          text: "Services",
          path: centerId
            ? `/centers/${centerId}/services/archived`
            : "/centers",
          icon: <Recycling />,
        },
      ],
    },
  ];
};

export const getMinimalDrawerItems = () => {
  return [
    { text: "Centers", icon: <Hub />, path: "/centers" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
    { text: "Logout", icon: <Logout />, path: "/logout" },
  ];
};
