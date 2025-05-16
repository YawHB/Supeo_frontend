import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { USER_MENU_LINKS } from "../../services/api/queries";
import { standardApolloError } from "../../utils/errorHandling.js";

import { sideBarItemsMap } from "./SideBarItems";

const useSideBarState = () => {
  const location = useLocation();
  const employee = useSelector(({ auth }) => auth.authenticatedUser);
  const [translate] = useTranslation("global");
  
  const [sideBarItems, setSideBarItems] = useState([]);
  const [userMenuLinks, setUserMenuLinks] = useState([]);
  const [systemMenuLinks, setSystemMenuLinks] = useState([]);
  const [showUserMenuLinks, setShowUserMenuLinks] = useState(false);
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  useQuery(USER_MENU_LINKS, {
    variables: {
      employeeId: Number(employee?.id),
    },
    skip: !employee?.employeeId,
    onCompleted: response => {
      if (!response.userMenuLinks) {
        setUserMenuLinks([]);
      }

      const menuItems = response.userMenuLinks.map(link => link.menuItem);
      setUserMenuLinks(menuItems);
    },
    onError: (error) =>
      standardApolloError("USER_MENU_LINKS", error, translate),
  });

  const toggleSideBarCollapse = () => {
    setIsSideBarCollapsed(!isSideBarCollapsed);
  };

  const isActiveFunction = useCallback(
    (item) => {
      return item.activeLocation === location.pathname;
    },
    [sideBarItems, location]
  );

  useEffect(() => {
    if (location.pathname === "/") {
      setShowUserMenuLinks(true);
    } else {
      setShowUserMenuLinks(false);
    }
    setSystemMenuLinks(["admin", "timeentries", "employees", "employee", "employee_time_entries"]);
  }, [location]);
  
  useEffect(() => {
    const newSideBarItems = [];
    for (const systemMenuLink of systemMenuLinks) {
      const sideBarItem = sideBarItemsMap.get(systemMenuLink);

      if (sideBarItem) {
        newSideBarItems.push(sideBarItem);
      }
    }

    if (!showUserMenuLinks) {
      setSideBarItems(newSideBarItems);
      return;
    }

    for (const userMenuLink of userMenuLinks) {
      const sideBarItem = sideBarItemsMap.get(userMenuLink);

      if (sideBarItem) {
        newSideBarItems.push(sideBarItem);
      }
    }
    setSideBarItems(newSideBarItems);
  }, [systemMenuLinks, userMenuLinks, showUserMenuLinks]);

  return {
    sideBarItems,
    isActiveFunction,
    isSideBarCollapsed,
    toggleSideBarCollapse,
  };
};

export default useSideBarState;
