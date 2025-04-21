import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { GET_ALL_EMPLOYEES } from "../../../services/api/admin/queries.js";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../../services/api/admin/mutations.js";
import { useModalState } from "../../../hooks/useModalState.js";

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient();

  const [translate] = useTranslation(`global`);
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployeesForm, setIsLoadingEmployeesForm] = useState(false);
  const [isShowingCreateEmployeeModal, setIsShowingCreateEmployeeModal] =
    useState(false);

  const [newEmployee, setNewEmployee] = useState(null);
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null);

  const employeeFormModalState = useModalState([
    employeeBeingEdited,
    () => setEmployeeBeingEdited(null),
  ]);
  const newEmployeeFormModalState = useModalState([
    newEmployee,
    () => setNewEmployee(null),
  ]);

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
      key: ``,
      label: ``,
      alwaysEnabled: true,
    },
  ];

  const tableActions = {
    edit: (employee) => setEmployeeBeingEdited(employee),
  };

  const { loading: isLoadingEmployees } = useQuery(GET_ALL_EMPLOYEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setEmployees(data.employees);
    },
    onError: (error) => {
      console.error("Error fetching employees:", error);
    },
  });

  const [createEmployee, { loading: isSubmittingNewEmployee }] = useMutation(
    CREATE_EMPLOYEE,
    {
      refetchQueries: [GET_ALL_EMPLOYEES],
    }
  );

  const [updateEmployee, { loading: isUpdatingEmployee }] =
    useMutation(UPDATE_EMPLOYEE);

  const toggleCreateEmployeeModal = () => {
    setIsShowingCreateEmployeeModal(!isShowingCreateEmployeeModal);
  };

  const handleSubmitNewEmployee = () => {
    setIsLoadingEmployeesForm(true);
    createEmployee({
      variables: {
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        role: newEmployee.role,
        email: newEmployee.email,
        phoneNumber: newEmployee.phoneNumber,
      },
      onCompleted: () => {
        setIsLoadingEmployeesForm(false);
        setNewEmployee(null);
      },
      onError: (error) => {
        console.error("Error creating employee:", error);
        setIsLoadingEmployeesForm(false);
      },
    });
  };

  const handleSubmitEditedEmployee = () => {
    updateEmployee({
      variables: {
        id: employeeBeingEdited.id,
        firstName: employeeBeingEdited.firstName,
        lastName: employeeBeingEdited.lastName,
        role: employeeBeingEdited.role,
        email: employeeBeingEdited.email,
        phoneNumber: employeeBeingEdited.phoneNumber,
      },
      onCompleted: () => {
        setEmployeeBeingEdited(null);
      },
      onError: (error) => {
        console.error("Error updating employee:", error);
      },
    });
  };

  return {
    translate,
    apolloClient,
    tableActions,
    isLoadingEmployees,
    employeesTableColumns,
    employeeFormModalState,
    handleSubmitNewEmployee,
    employees,
    setEmployees,
    toggleCreateEmployeeModal,
    handleSubmitEditedEmployee,
    createEmployee,
    isSubmittingNewEmployee,
    updateEmployee,
    isUpdatingEmployee,
    employeeBeingEdited,
    setEmployeeBeingEdited,
    isLoadingEmployeesForm,
    setIsLoadingEmployeesForm,
    isShowingCreateEmployeeModal,
    setIsShowingCreateEmployeeModal,
    newEmployeeFormModalState,
    newEmployee,
    setNewEmployee,
  };
};

export default useEmployeesPageState;
