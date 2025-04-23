import { useState } from "react";

const useSideBarState = () => {
  const [sideBarItems] = useState([]);

  return {
    sideBarItems,
  };
};

export default useSideBarState;
