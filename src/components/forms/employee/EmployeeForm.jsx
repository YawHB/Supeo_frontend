import { useTranslation } from 'react-i18next'
import useEmployeeFormState from './EmployeeFormState'
import { Form, Row, Col, Input, Label, FormGroup, Alert, Fade } from 'reactstrap'
import useEmployeesPageState from '../../../components/pages/admin/adminEmployeesPageState.js'

const EmployeeForm = ({ onSubmit, employee = null, errorMessages = null }) => {
  const state = useEmployeesPageState()
  const [translate] = useTranslation('global')
  const { input } = useEmployeeFormState(employee)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      firstName: input.firstName.value,
      lastName: input.lastName.value,
      roleName: input.employeeRoleName.value,
      permissionLevel: input.employeePermissionLevel.value,
      email: input.email.value,
      phoneNumber: input.phoneNumber.value,
      password: input.password.value,
    })
  }

  return (
    <>
      {errorMessages && (
        <Alert color='danger' className='mb-4' timeout={{ enter: 150, exit: 150 }}>
          <ul className='mb-0 list-unstyled'>
            {errorMessages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form id='employeeForm' onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='firstName'>
                {translate('first_name')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='firstName'
                name='firstName'
                placeholder={translate('first_name_placeholder')}
                type='text'
                value={input.firstName.value}
                onChange={input.firstName.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='lastName'>
                {translate('last_name')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='lastName'
                name='lastName'
                placeholder={translate('last_name_placeholder')}
                type='text'
                value={input.lastName.value}
                onChange={input.lastName.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='email'>
                {translate('email')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='email'
                name='email'
                placeholder={translate('email_placeholder')}
                type='email'
                value={input.email.value}
                onChange={input.email.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='phoneNumber'>
                {translate('phone')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                placeholder={translate('phone_placeholder')}
                type='text'
                value={input.phoneNumber.value}
                onChange={input.phoneNumber.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='employeeRole'>{translate('user_group')}</Label>
              <span className='text-danger'>*</span>
              <Input
                id='employeeRole'
                name='employeeRole'
                className='form-control'
                type='select'
                value={input.employeeRoleName.value}
                onChange={input.employeeRoleName.onChange}
                required
              >
                <option value='' disabled>
                  {translate('user_group_placeholder')}
                </option>
                {state.roles.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='employeePermission'>
                {translate('permission')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='employeePermission'
                name='employeePermission'
                type='select'
                className='form-control'
                value={input.employeePermissionLevel.value}
                onChange={input.employeePermissionLevel.onChange}
                required
              >
                <option value='' disabled>
                  {translate('permission_placeholder')}
                </option>
                {state.permissions.map((permission) => (
                  <option key={permission.id} value={permission.permissionLevel}>
                    {permission.permissionLevel}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='Kodeord'>
                {translate('Password')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='password'
                name='password'
                placeholder={translate('password_placeholder')}
                type='text'
                value={input.password.value}
                onChange={input.password.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default EmployeeForm
