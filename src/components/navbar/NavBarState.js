import { useNavigate } from "react-router-dom";

const useNavBarState = () => {
  const navigate = useNavigate();;

  return {
    location,
    navigate,
  };
};

export default useNavBarState;
