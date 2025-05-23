import { useEffect } from 'react'
import { useInput } from '../../../hooks/useInput'

const useEmployeeFormState = (employee) => {
  const input = {
    id: useInput(employee?.id ?? ''),
    firstName: useInput(employee?.firstName ?? ''),
    lastName: useInput(employee?.lastName ?? ''),
    employeeRoleName: useInput(employee?.roleName ?? ''),
    employeePermissionLevel: useInput(employee?.permissionLevel ?? ''),
    email: useInput(employee?.email ?? ''),
    phoneNumber: useInput(employee?.phoneNumber ?? ''),
  }

  //console

  useEffect(() => {
    if (employee) {
      input.id.setValue(employee.id)
      input.firstName.setValue(employee.firstName)
      input.lastName.setValue(employee.lastName)
      input.employeeRoleName.setValue(employee.roleName)
      input.employeePermissionLevel.setValue(employee.permissionLevel)
      input.email.setValue(employee.email)
      input.phoneNumber.setValue(employee.phoneNumber)
    }
  }, [employee])

  return { input }
}

export default useEmployeeFormState
