import { useContext } from "react";
import { captainDataContext } from "../context/captainContext";

// Custom hook to use captain data
const useCaptain = () => {
  const context = useContext(captainDataContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainContextProvider");
  }
  return context;
};

export default useCaptain;
