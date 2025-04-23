import { faUser, faClock, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";

export const sideBarItemsMap = new Map();

sideBarItemsMap.set("admin", {
  icon: faUserTie,
  label: "nav_bar.admin_label",
  link: "/admin",
  activeLocation: "/admin",
});

sideBarItemsMap.set("employees", {
  icon: faUsers,
  label: "nav_bar.employees_label",
  link: "/employees",
  activeLocation: "/employees",
});

sideBarItemsMap.set("timeentries", {
  icon: faClock,
  label: "nav_bar.time_entries_label",
  link: "/timeentries",
  activeLocation: "/timeentries",
});

sideBarItemsMap.set("employee", {
  icon: faUser,
  label: "nav_bar.employee_label",
  link: "/employee",
  activeLocation: "/employee",
});
