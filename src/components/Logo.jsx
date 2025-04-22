import React from "react";
import SupeoLogo from "../assets/SupeoLogo.jsx";

const Logo = ({
  className,
  text,
  imgStyle,
  textStyle,
  logoColor = "#E0FDAD",
  textColor = "#FCFFFF",
}) => {
  return (
    <div className={`d-flex align-items-center ${className || ""}`}>
      <SupeoLogo style={{ ...imgStyle, color: logoColor }} />
      {text && (
        <span
          style={{
            marginLeft: "0.5rem",
            color: textColor,
            ...textStyle,
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Logo;
