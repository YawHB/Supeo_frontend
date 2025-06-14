import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import showToast from '../../../utils/toast.js'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import exportTableData from '../../../utils/exportTableData.js'
import { useModalState } from '../../../hooks/useModalState.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import {
  GET_ROLES,
  GET_PERMISSIONS,
  GET_ALL_EMPLOYEES,
  GET_ALL_FILTERED_EMPLOYEES,
  GET_PAGINATED_EMPLOYEES,
} from '../../../services/employee/queries.js'
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../../../services/employee/mutations.js'
import { useInput } from '../../../hooks/useInput.js'
import { useDebouncedInput } from '../../../hooks/useDebouncedInput.js'
import usePagination from '../../../hooks/usePagination.js'
import useSort from '../../../hooks/useSort.js'
import { handleMemberAuthError } from '../../../utils/errorHandling.js'

const useEmployeesPageState = () => {
  const navigate = useNavigate()
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

  const employeeRolesFilterInput = useInput([])
  const employeePermissionsFilterInput = useInput([])

  const searchInput = useDebouncedInput('', 300)
  const pagination = usePagination({ page: 1, perPage: 10 }, [10, 25, 50, 100, 250, 500])
  const { orderBy, orderDirection, sort, sortIcon } = useSort('id', 'ASC')

  const employeeRoleOptions = roles.map((role) => {
    const modifiedRole = {
      label: role.roleName || role.name,
      value: role.roleName || role.id,
    }
    return modifiedRole
  })

  const employeePermissionOptions = permissions.map((permission) => ({
    label: permission.permissionLevel || permission.permissionLevel,
    value: permission.permissionLevel || permission.id,
  }))

  const selectedRoles = employeeRolesFilterInput.value?.length
    ? employeeRolesFilterInput.value.map((r) => r.value)
    : []

  const selectedPermissions = employeePermissionsFilterInput.value?.length
    ? employeePermissionsFilterInput.value.map((p) => p.value)
    : []

  const employeeSortMapping = {
    id: 'id',
    firstName: 'first_name',
    lastName: 'last_name',
    roleName: 'role_name',
    permissionLevel: 'permission_level',
    phoneNumber: 'phone_number',
    email: 'email',
  }

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
    onError: (errors) => handleMemberAuthError(errors, navigate),
  })

  const { loading: isLoadingPermissions } = useQuery(GET_PERMISSIONS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setPermissions(data.permissions),
    onError: (errors) => handleMemberAuthError(errors, navigate),
  })

  const { loading: isLoadingEmployees, refetch } = useQuery(GET_ALL_EMPLOYEES, {
    variables: {
      search: searchInput.debouncedValue || null,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setEmployees(data.employees)
    },
    onError: (errors) => {
      handleMemberAuthError(errors, navigate)
      if (errors.graphQLErrors && errors.graphQLErrors.length > 0) {
        const messages = errors.graphQLErrors.map((e) => e.message)
        setErrorMessages(messages)
      } else {
        setErrorMessages(['Noget gik galt. Prøv igen.'])
      }
    },
  })

  const [filteredEmployees, { loading: isLoadingFilteredEmployees }] = useLazyQuery(
    GET_ALL_FILTERED_EMPLOYEES,
    {
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {
        setEmployees(data.filteredEmployees)
      },
    },
  )

  const { loading: isLoadingPaginatedEmployees } = useQuery(GET_PAGINATED_EMPLOYEES, {
    variables: {
      page: pagination.state.page,
      perPage: pagination.state.perPage,
      search: searchInput.debouncedValue || null,
      roles: selectedRoles,
      permissions: selectedPermissions,
      sort: {
        orderBy: employeeSortMapping[orderBy],
        orderDirection: orderDirection,
      },
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setEmployees(data.paginatedEmployees.employees)
      pagination.setTotalCount?.(data.paginatedEmployees.pagination.totalCount)
    },
    onError: (errors) => handleMemberAuthError(errors, navigate),
  })

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
    showToast(translate('export_table.start'), 'info')

    const tableToExport = employees
    const today = new Date().toISOString().split('T')[0]

    try {
      exportTableData({
        data: tableToExport,
        filename: `${translate('export_table.employees_overview')} ${today}`,
        columns: employeesTableColumns.filter((col) => col.key !== 'id' && col.key !== ''),
      })
      showToast(translate('export_table.success'), 'success')
    } catch {
      showToast(translate('export_table.error'), 'error')
    }
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
    searchInput,
    pagination,
    isLoadingPaginatedEmployees,

    orderBy,
    orderDirection,
    sort,
    sortIcon,
  }
}

export default useEmployeesPageState
