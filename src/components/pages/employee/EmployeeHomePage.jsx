import { useTranslation } from "react-i18next";

const EmployeeHomePage = () => {
  const [translate] = useTranslation("global");

  document.title = translate("nav_bar.employee_home");

  return (
    <>
      <h1>Employee Homepage</h1>
    </>
  );
}

export default EmployeeHomePage;
