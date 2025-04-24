// src/utils/showToast.js
import { toast } from "react-toastify";

/**
 * Show a toast with custom settings
 * @param {string} message - The message to show in the toast
 * @param {'info' | 'success' | 'error' | 'warning'} [type='info'] - Type of toast
 * @param {object} [options={}] - Optional toast settings
 */
const showToast = (message, type = "info", options = {}) => {
  const toastTypeMap = {
    success: toast.success,
    error: toast.error,
    warning: toast.warn,
    info: toast.info,
  };

  const show = toastTypeMap[type] || toast.info;

  show(message, {
    position: options.position || "top-right",
    autoClose:
      typeof options.autoClose === "boolean"
        ? options.autoClose
          ? 5000
          : false
        : 5000,
    className: options.wide ? "toast-wide" : "",
    ...options,
  });
};

export default showToast;
