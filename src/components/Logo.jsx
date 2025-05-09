import React from "react";
import SupeoLogo from "../assets/SupeoLogo.jsx";

const Logo = ({
  text,
  imgStyle,
  className,
  textStyle,
  logoColor = "#E6FBB5",
  textColor = "#F8F9FA",
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
