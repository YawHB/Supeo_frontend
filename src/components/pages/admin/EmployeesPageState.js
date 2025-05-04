import { Button } from "reactstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import showToast from "../../lib/toast/toast.js";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../hooks/useModalState.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { GET_ALL_EMPLOYEES } from "../../../services/api/admin/queries.js";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../../services/api/admin/mutations.js";

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient();
  const [translate] = useTranslation("global");

  const [employees, setEmployees] = useState([]);

  const employeeFormModalState = useModalState();
  const newEmployeeFormModalState = useModalState();

  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null);
  const [isLoadingEmployeesForm, setIsLoadingEmployeesForm] = useState(false);
  
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
            setEmployeeBeingEdited(employee);
            employeeFormModalState.openModal();
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
  });

  const [createEmployee, { loading: isSubmittingNewEmployee }] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES],
  });

  const [updateEmployee, { loading: isUpdatingEmployee }] = useMutation(UPDATE_EMPLOYEE);

  const handleSubmitNewEmployee = (employee) => {
    setIsLoadingEmployeesForm(true);
    createEmployee({
      variables: { newEmployee: employee },
      onCompleted: (data) => {
        showToast(translate("notification.employee.create.success"), {
          name: employee.firstName,
        }),
          {
            type: "success",
          };
        setEmployees((prev) => [...prev, data.createEmployee]);
        const successMsg = translate("notification.employee.create.success", {
          firstName: employee.firstName,
          lastName: employee.lastName,
        });
        showToast(successMsg, "success");
        //setEmployees((prev) => [...prev, data.createEmployee]);
        setIsLoadingEmployeesForm(false);
        newEmployeeFormModalState.closeModal();
      },
      onError: () => {
        showToast(translate("notification.employee.create.error"), {
          type: "error",
        });
      },
    });
  };

  const handleSubmitEditedEmployee = (updatedEmployee) => {
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
    onError: () => {
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
