import { isDev } from "./config.js";
import showToast from "../utils/toast.js";

/**
 *
 * @param {string} query
 * @param {import("@apollo/client").ApolloError} error
 * @param {import("i18next").TFunction} translate
 */
export const standardApolloError = (query, error, translate) => {
  if (isDev()) {
    showToast(`${query}: ${String(error)}`, {
      type: `error`,
      autoClose: false,
      position: `top-right`,
      title: translate(`errors.error`),
    });
  } else {
    showToast(
      translate(`errors.no_response_from_server`, {
        type: `error`,
        autoClose: true,
        position: `top-right`,
        title: translate(`errors.error`),
      })
    );
  }
};
