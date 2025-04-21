import React from "react";

const SupeoLogo = ({ style, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 867.41 578.07"
      style={style}
      className={className}
      fill="currentColor"
    >
      <polyline points="144.71 433.55 578.25 0 722.76 0 722.77 144.53 289.23 578.06 144.71 578.06 144.64 433.53" />
      <polygon points="289.11 0 289.11 144.55 144.62 289.17 144.64 433.53 0 433.56 0.13 144.54 144.71 0 289.11 0" />
      <polygon points="578.25 578.07 578.25 433.52 722.75 288.91 722.72 144.54 867.36 144.52 867.24 433.54 722.65 578.07 578.25 578.07" />
    </svg>
  );
};

export default SupeoLogo;
