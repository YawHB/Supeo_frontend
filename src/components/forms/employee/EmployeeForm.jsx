import { useTranslation } from "react-i18next";
import { Form, Row, Col, Input, Label, FormGroup } from "reactstrap";
import useEmployeeFormState from "./EmployeeFormState";
import Select from "react-select";
import useEmployeesPageState from "../../pages/admin/employees/EmployeesPageState";


const EmployeeForm = ({ onSubmit, employee = null }) => {
  const [translate] = useTranslation("global");
  const state = useEmployeesPageState();
  const {
    input,
    //employeeRoleOptions,
    employeePermissionOptions,
    //isLoadingRoles,
    isLoadingPermissions
  } = useEmployeeFormState(employee)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      firstName: input.firstName.value,
      lastName: input.lastName.value,
      employeeRoleId: input.employeeRoleId.value,
      employeePermissionId: input.employeePermissionId.value,
      email: input.email.value,
      phoneNumber: input.phoneNumber.value,
    });
  };

  //const selectedRoleOption = employeeRoleOptions.find((opt) => opt.value === input.employeeRoleId.value) || null
  //const selectedPermissionOption = employeePermissionOptions.find((opt) => opt.value === input.employeePermissionId.value) || null

  return (
    <Form id='newEmployeeForm' onSubmit={handleSubmit}>
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
          {/* <FormGroup>
            <Label for='employeeRole'>
              {translate('role')}
              <span className='text-danger'>*</span>
            </Label>
            <Select
              id='employeeRole'
              name='employeeRole'
              options={employeeRoleOptions}
              value={selectedRoleOption}
              isLoading={isLoadingRoles}
              onChange={(opt) =>
                input.employeeRoleId.onChange({
                  target: { value: opt.value },
                })
              }
            />
          </FormGroup> */}
          <FormGroup>
            <Label for="employeeRole">Brugergruppe</Label>
            <Input id="employeeRole" name="employeeRole" type="select">
            {state.roles.map((role) => {
              return <option key={role.id}>{role.roleName}</option>
            })}
            
            </Input>


          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for='employeePermission'>
              {translate('permission')}
              <span className='text-danger'>*</span>
            </Label>
            <Select
              id='employeePermission'
              name='employeePermission'
              options={employeePermissionOptions}
              // value={selectedPermissionOption}
              isLoading={isLoadingPermissions}
              onChange={(opt) =>
                input.employeePermissionId.onChange({
                  target: { value: opt.value },
                })
              }
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
};

export default EmployeeForm;
