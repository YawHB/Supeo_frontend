import { useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { GET_ALL_EMPLOYEES } from "../../../services/api/admin/queries.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../../services/api/admin/mutations.js";
import { useModalState } from "../../../hooks/useModalState.js";

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient();
  const [translate] = useTranslation("global");

  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployeesForm, setIsLoadingEmployeesForm] = useState(false);
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null);

  const employeeFormModalState = useModalState();
  const newEmployeeFormModalState = useModalState();

  const employeesTableColumns = [
    { key: "id", label: translate("id"), type: "text", sort: true },
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
    { key: "role", label: translate("role"), type: "text", sort: true },
    { key: "email", label: translate("email"), type: "text", sort: true },
    { key: "phoneNumber", label: translate("phone"), type: "text", sort: true },
    {
      key: " ",
      label: " ",
      type: `view`,
      alwaysEnabled: true,
      view: (employee) => (
        <Button
          color="primary"
          outline
          onClick={() => {
            setEmployeeBeingEdited(employee); // Set the employee to edit
            employeeFormModalState.openModal(); // Open edit modal
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      ),
    },
  ];

  const { loading: isLoadingEmployees } = useQuery(GET_ALL_EMPLOYEES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setEmployees(data.employees),
    onError: (error) => console.error("Error fetching employees:", error),
  });

  const [createEmployee, { loading: isSubmittingNewEmployee }] = useMutation(
    CREATE_EMPLOYEE,
    {
      refetchQueries: [GET_ALL_EMPLOYEES],
    }
  );

  const [updateEmployee, { loading: isUpdatingEmployee }] =
    useMutation(UPDATE_EMPLOYEE);

  // Function to handle employee creation
  const handleSubmitNewEmployee = (employee) => {
    setIsLoadingEmployeesForm(true);
    createEmployee({
      variables: { newEmployee: employee },
      onCompleted: (data) => {
        setEmployees((prev) => [...prev, data.createEmployee]);
        setIsLoadingEmployeesForm(false);
        newEmployeeFormModalState.closeModal(); // Close modal after successful creation
      },
      onError: (error) => {
        console.error("Error creating employee:", error);
        setIsLoadingEmployeesForm(false);
      },
    });
  };

  const handleSubmitEditedEmployee = (updatedEmployee) => {
  // const isUnchanged =
  //   updatedEmployee.firstName === employeeBeingEdited.firstName &&
  //   updatedEmployee.lastName === employeeBeingEdited.lastName &&
  //   updatedEmployee.email === employeeBeingEdited.email &&
  //   updatedEmployee.phoneNumber === employeeBeingEdited.phoneNumber &&
  //   updatedEmployee.role === employeeBeingEdited.role;

  // if (isUnchanged) {
  //   console.log("Ingen ændringer – opdatering springes over.");
  //   employeeFormModalState.closeModal();
  //   return;
  // }

  setIsLoadingEmployeesForm(true);

  updateEmployee({
    variables: {
      updateEmployeeId: employeeBeingEdited.id,
      updatedEmployee,
    },
    onCompleted: () => {
      setIsLoadingEmployeesForm(false);
      setEmployeeBeingEdited(null);
      employeeFormModalState.closeModal();
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      setIsLoadingEmployeesForm(false);
    },
  });
};

  return {
    translate,
    apolloClient,
    isLoadingEmployees,
    employeesTableColumns,
    employeeFormModalState,
    newEmployeeFormModalState,
    handleSubmitNewEmployee,
    employees,
    handleSubmitEditedEmployee,
    createEmployee,
    isSubmittingNewEmployee,
    updateEmployee,
    isUpdatingEmployee,
    employeeBeingEdited,
    setEmployeeBeingEdited,
    isLoadingEmployeesForm,
    setIsLoadingEmployeesForm,
  };
};

export default useEmployeesPageState;
