// src/utils/showToast.js
import { toast } from "react-toastify";

/**
 * Show a toast with custom settings
 * @param {string} message - The message to show in the toast
 * @param {('info'|'success'|'error'|'warn')} type - Type of toast ('info', 'success', 'error', 'warn')
 * @param {object} [options={}] - Optional configuration for the toast
 */
const showToast = (message, type = "info", options = {}) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        ...options,
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        ...options,
      });
      break;
    case "warn":
      toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        ...options,
      });
      break;
    case "info":
    default:
      toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        ...options,
      });
      break;
  }
};

export default showToast;
