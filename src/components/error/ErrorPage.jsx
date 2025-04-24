import { isDev } from "../../config";
import { useTranslation } from "react-i18next";

const ErrorPage = ({ error }) => {
  const [translate] = useTranslation(`global`);

  const message = isDev() ? error?.message : translate(`errors.error_message`);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-danger">{message}</h1>
    </div>
  );
};

export default ErrorPage;
