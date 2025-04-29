import { faUser, faClock, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";

export const sideBarItemsMap = new Map();

sideBarItemsMap.set("admin", {
  icon: faUserTie,
  link: "/admin",
  label: "side_bar.admin_home",
  activeLocation: "/admin",
});

sideBarItemsMap.set("employee", {
  icon: faUser,
  link: "/employee",
  label: "side_bar.employee_home",
  activeLocation: "/employee",
});

sideBarItemsMap.set("employees", {
  icon: faUsers,
  link: "/employees",
  label: "side_bar.employees",
  activeLocation: "/employees",
});

sideBarItemsMap.set("timeentries", {
  icon: faClock,
  link: "/timeentries",
  label: "side_bar.time_entries",
  activeLocation: "/timeentries",
});

sideBarItemsMap.set("employee_time_entries", {
  icon: faClock,
  link: "/employee/time-entries",
  label: "side_bar.employee_time_entries",
  activeLocation: "/employee/time-entries",
});
