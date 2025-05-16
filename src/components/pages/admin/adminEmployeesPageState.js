import { useState } from 'react'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import showToast from '../../../utils/toast.js'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import exportTableData from '../../../utils/exportTableData.js'
import { useModalState } from '../../../hooks/useModalState.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { GET_ALL_EMPLOYEES } from '../../../services/employee/queries.js'
import { GET_ROLES, GET_PERMISSIONS } from '../../../services/employee/queries.js'
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from '../../../services/employee/mutations.js'
//import { useInput } from "../../../hooks/useInput.js";
//import usePagination from "../../../../hooks/usePagination.js";

const useEmployeesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')

  const employeeFormModalState = useModalState()
  const newEmployeeFormModalState = useModalState()

  const [roles, setRoles] = useState([])
  const [employees, setEmployees] = useState([])
  const [permissions, setPermissions] = useState([])
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null)
  const [isLoadingEmployeesForm, setIsLoadingEmployeesForm] = useState(false)

  //const searchInput = useDebouncedInput(" ");
  //const [orderBy, setOrderBy] = useState("id");
  //const employeeRolesFilterInput = useInput([]);
  //const [orderDirection, setOrderDirection] = useState('ASC')
  //const pagination = usePagination({ page: 1, perPage: 25 }, [10, 25, 50, 100, 250, 500])

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
            employeeFormModalState.openModal()
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      ),
    },
  ]

  const { loading: isLoadingRoles } = useQuery(GET_ROLES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setRoles(data.roles),
  })

  const { loading: isLoadingPermissions } = useQuery(GET_PERMISSIONS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setPermissions(data.permissions),
  })

  const { loading: isLoadingEmployees, refetch } = useQuery(GET_ALL_EMPLOYEES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setEmployees(data.employees),
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
        newEmployeeFormModalState.closeModal()
      },
      onError: () => {
        const errorMsg = translate('notification.employee.create.error', {
          firstName: employee.firstName,
          lastName: employee.lastName,
        })
        showToast(translate(errorMsg), 'error')
        setIsLoadingEmployeesForm(false)
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
      onError: () => {
        const errorMsg = translate('notification.employee.update.error', {
          firstName: updatedEmployee.firstName,
          lastName: updatedEmployee.lastName,
        })
        showToast(errorMsg, 'error')
        setIsLoadingEmployeesForm(false)
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

  // const { loading: isLoadingEmployees, data: employeesData, variables: employeesVariables} = useQuery(GET_ALL_EMPLOYEES, {
  //   variables: {
  //     pagination: pagination.requestArgs,
  //   },
  // });

  // const { loading: isLoadingEmployeeRoleOptions, data: employeeRolesData } = useQuery(EMPLOYEE_ROLES);
  // const employeeRoleOptions = useQueryData(employeeRolesData, data => {
  //   return data?.employeeRoles.map(
  //     employeeRoles => ({label: employeeRoles.name, value: employeeRoles.id}),
  //   );
  // });

  return {
    roles,
    employees,
    translate,
    permissions,
    setEmployees,
    apolloClient,
    createEmployee,
    updateEmployee,
    isLoadingRoles,
    handleExportTable,
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
    newEmployeeFormModalState,
    handleSubmitEditedEmployee,
    setIsLoadingEmployeesForm,

    //orderBy,
    //pagination,
    //setOrderBy,
    //orderDirection,
    //setOrderDirection,
    //employeeRoleOptions,
    //employeeRolesFilterInput,
    //isLoadingEmployeeRoleOptions,
  }
}

export default useEmployeesPageState
