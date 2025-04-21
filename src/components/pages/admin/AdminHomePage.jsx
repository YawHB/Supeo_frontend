import { useTranslation } from "react-i18next";

const AdminHomePage = () => {
  const [translate] = useTranslation("global");
  document.title = translate("nav_bar.admin_home");

  return (
    <>
      <h1>Admin Homepage</h1>
    </>
  );
};

export default AdminHomePage;
