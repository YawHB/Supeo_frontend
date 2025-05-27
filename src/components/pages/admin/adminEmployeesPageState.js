import { useState } from 'react'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import showToast from '../../../utils/toast.js'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import exportTableData from '../../../utils/exportTableData.js'
import { useModalState } from '../../../hooks/useModalState.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation, useApolloClient, useLazyQuery } from '@apollo/client'
import {
  GET_ROLES,
  GET_PERMISSIONS,
  GET_ALL_EMPLOYEES,
  GET_ALL_FILTERED_EMPLOYEES,
} from '../../../services/employee/queries.js'
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../../../services/employee/mutations.js'
import { useInput } from '../../../hooks/useInput.js'
import { useDebouncedInput } from '../../../hooks/useDebouncedInput.js'

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')

  const resetErrorMessages = () => setErrorMessages(null)
  const employeeFormModalState = useModalState()

  const [errorMessages, setErrorMessages] = useState()
  const [roles, setRoles] = useState([])
  const [employees, setEmployees] = useState([])
  const [permissions, setPermissions] = useState([])
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null)
  const [isLoadingEmployeesForm, setIsLoadingEmployeesForm] = useState(false)

  const employeeRolesFilterInput = useInput([]) // hook til håndtering af vores roller, start med tomt array
  const employeePermissionsFilterInput = useInput([])
  const debouncedSearch = useDebouncedInput('', 300)

  // mapper vores roller til options-format til dropdown, med label og value
  const employeeRoleOptions = roles.map((role) => {
    const modifiedRole = {
      label: role.roleName || role.name, // det som der vises i vores dropdowns
      value: role.roleName || role.id,
    }
    //console.log('modifiedRole', modifiedRole)
    return modifiedRole
  })

  const employeePermissionOptions = permissions.map((permission) => ({
    label: permission.permissionLevel || permission.permissionLevel,
    value: permission.permissionLevel || permission.id,
  }))

  //tager kun værdier fra vores valgte roller, eller en tom liste hvis der ikke er valgt nboget
  const selectedRoles = employeeRolesFilterInput.value?.length
    ? employeeRolesFilterInput.value.map((r) => r.value)
    : []

  const selectedPermissions = employeePermissionsFilterInput.value?.length
    ? employeePermissionsFilterInput.value.map((p) => p.value)
    : []

  const employeesTableColumns = [
    { key: 'id', label: translate('id'), type: 'text', sort: true },
    { key: 'firstName', label: translate('first_name'), type: 'text', sort: true },
    { key: 'lastName', label: translate('last_name'), type: 'text', sort: true },
    { key: 'roleName', label: translate('user_group'), type: 'text', sort: true },
    { key: 'permissionLevel', label: translate('permission'), type: 'text', sort: true },
    { key: 'phoneNumber', label: translate('phone'), type: 'text', sort: true },
    { key: 'email', label: translate('email'), type: 'text', sort: true },
    {
      key: '',
      label: '',
      type: `view`,
      alwaysEnabled: true,
      view: (employee) => (
        <Button
          color='primary'
          outline
          onClick={() => {
            setEmployeeBeingEdited(employee)
            employeeFormModalState.openModal(employee)
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      ),
    },
  ]

  const { loading: isLoadingRoles } = useQuery(GET_ROLES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setRoles(data.roles)
    },
  })

  const { loading: isLoadingPermissions } = useQuery(GET_PERMISSIONS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setPermissions(data.permissions),
  })

  const { loading: isLoadingEmployees, refetch } = useQuery(GET_ALL_EMPLOYEES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setEmployees(data.employees)
    },
  })

  const [filteredEmployees, { loading: isLoadingFilteredEmployees }] = useLazyQuery(
    GET_ALL_FILTERED_EMPLOYEES,
    {
      variables: {
        search: debouncedSearch || null,
      },
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {
        setEmployees(data.filteredEmployees)
        console.log('DATA FRA BACKEND', data)
      },
    },
  )
  

  const [createEmployee, { loading: isSubmittingNewEmployee }] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES],
  })

  const [updateEmployee, { loading: isUpdatingEmployee }] = useMutation(UPDATE_EMPLOYEE)

  const handleSubmitNewEmployee = (employee) => {
    setIsLoadingEmployeesForm(true)
    createEmployee({
      variables: { newEmployee: employee },
      onCompleted: (data) => {
        const successMsg = translate('notification.employee.create.success', {
          firstName: employee.firstName,
          lastName: employee.lastName,
        })
        showToast(successMsg, 'success')
        setEmployees((prev) => [...prev, data.createEmployee])
        setIsLoadingEmployeesForm(false)
        employeeFormModalState.closeModal(), resetErrorMessages()
      },
      onError: (errors) => {
        setIsLoadingEmployeesForm(false)
        if (errors?.graphQLErrors?.length) {
          const messages = errors.graphQLErrors.map((e) => e.message)
          setErrorMessages(messages)
        } else {
          setErrorMessages(['Noget gik galt. Prøv igen'])
        }
      },
    })
  }

  const handleSubmitEditedEmployee = (updatedEmployee) => {
    setIsLoadingEmployeesForm(true)
    updateEmployee({
      variables: {
        updateEmployeeId: employeeBeingEdited.id,
        updatedEmployee,
      },
      onCompleted: () => {
        const successMsg = translate('notification.employee.update.success', {
          firstName: updatedEmployee.firstName,
          lastName: updatedEmployee.lastName,
        })
        refetch().then((result) => {
          setEmployees(result.data.employees)
        })
        showToast(successMsg, 'success')
        setIsLoadingEmployeesForm(false)
        setEmployeeBeingEdited(null)
        employeeFormModalState.closeModal()
      },
      onError: (errors) => {
        setIsLoadingEmployeesForm(false)
        if (errors?.graphQLErrors?.length) {
          const messages = errors.graphQLErrors.map((e) => e.message)
          setErrorMessages(messages)
        } else {
          setErrorMessages(['Noget gik galt. Prøv igen'])
        }
      },
    })
  }

  const handleExportTable = () => {
    const startMsg = translate('export_table.start')
    showToast(startMsg, 'info')
    apolloClient
      .query({ query: GET_ALL_EMPLOYEES, fetchPolicy: 'network-only' })
      .then((result) => {
        const data = result.data?.employees ?? []
        const today = new Date().toISOString().split('T')[0]
        return exportTableData({
          data,
          filename: `${translate(`export_table.employees_overview`)} ${today}`,
          columns: employeesTableColumns.filter((col) => col.key !== 'id' && col.key !== ''),
          //columns: employeesTableColumns,
          strategy: 'xlsx',
        })
      })
      .then(
        () => {
          const successMsg = translate('export_table.success')
          showToast(successMsg, 'success')
        },
        () => {
          const errorMsg = translate('export_table.error')
          showToast(errorMsg, 'error')
        },
      )
  }

  return {
    roles,
    employees,
    translate,
    permissions,
    setEmployees,
    errorMessages,
    apolloClient,
    createEmployee,
    updateEmployee,
    isLoadingRoles,
    handleExportTable,
    resetErrorMessages,
    isUpdatingEmployee,
    isLoadingEmployees,
    employeeBeingEdited,
    isLoadingPermissions,
    employeesTableColumns,
    employeeFormModalState,
    setEmployeeBeingEdited,
    isLoadingEmployeesForm,
    handleSubmitNewEmployee,
    isSubmittingNewEmployee,
    setIsLoadingEmployeesForm,
    handleSubmitEditedEmployee,
    isLoadingFilteredEmployees,
    employeeRoleOptions,
    employeePermissionOptions,
    employeeRolesFilterInput,
    employeePermissionsFilterInput,
    filteredEmployees,
    selectedRoles,
    selectedPermissions,
    debouncedSearch,
  }
}

export default useEmployeesPageState
