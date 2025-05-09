import { useInput } from "../../../hooks/useInput";

const useEmployeeFormState = (employee) => {
  const input = {
    id: useInput(employee?.id ?? null),
    firstName: useInput(employee?.firstName ?? ""),
    lastName: useInput(employee?.lastName ?? ""),
    employeeRoleName: useInput(employee?.employeeRoleName?.id ?? ""),
    employeePermissionLevel: useInput(employee?.employeePermissionLevel?.id ?? ""),
    email: useInput(employee?.email ?? ""),
    phoneNumber: useInput(employee?.phoneNumber ?? ""),
  };

   return {
     input,
   }
};

export default useEmployeeFormState;
