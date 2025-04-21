import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useApolloClient } from "@apollo/client";
import { GET_ALL_EMPLOYEES } from "../../../services/api/admin/queries.js";

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient();

  const [translate] = useTranslation(`global`);
  const [employees, setEmployees] = useState([]);

  const employeesTableColumns = [
    {
      key: "id",
      label: translate("id"),
      type: "text",
      sort: true,
    },
    {
      key: "firstName",
      label: translate("first_name"),
      type: "text",
      sort: true,
    },
    {
      key: "lastName",
      label: translate("last_name"),
      type: "text",
      sort: true,
    },
    {
      key: "role",
      label: translate("role"),
      type: "text",
      sort: true,
    },
    {
      key: "email",
      label: translate("email"),
      type: "text",
      sort: true,
    },
    {
      key: "phoneNumber",
      label: translate("phone"),
      type: "text",
      sort: true,
    },
    {
      label: ``,
      alwaysEnabled: true,    
    },
  ];

  const { loading: isLoadingEmployees } = useQuery(GET_ALL_EMPLOYEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setEmployees(data.employees);
    },
    onError: (error) => {
      console.error("Error fetching employees:", error);
    },
  });

  return {
    translate,
    employees,
    setEmployees,
    apolloClient,
    isLoadingEmployees,
    employeesTableColumns,
  };
};

export default useEmployeesPageState;
