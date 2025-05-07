import { useTranslation } from "react-i18next";
import useEmployeeFormState from "./EmployeeFormState";
import { Form, Row, Col, Input, Label, FormGroup } from "reactstrap";

const EmployeeForm = ({ onSubmit, employee = null }) => {
  const [translate] = useTranslation("global");
  const { input } = useEmployeeFormState(employee);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      firstName: input.firstName.value,
      lastName: input.lastName.value,
      //role: input.role.value,
      email: input.email.value,
      phoneNumber: input.phoneNumber.value,
    });
  };

  return (
    <Form id="newEmployeeForm" onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">
              {translate("first_name")}
              <span className="text-danger">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder={translate("first_name_placeholder")}
              type="text"
              value={input.firstName.value}
              onChange={input.firstName.onChange}
              required
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="lastName">
              {translate("last_name")}
              <span className="text-danger">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder={translate("last_name_placeholder")}
              type="text"
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
            <Label for="role">
              {translate("role")}
              <span className="text-danger">*</span>
            </Label>
            <Input
              id="role"
              name="role"
              placeholder={translate("role_placeholder")}
              type="text"
              value={input.role.value}
              onChange={input.role.onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="phoneNumber">
              {translate("phone")}
              <span className="text-danger">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder={translate("phone_placeholder")}
              type="text"
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
            <Label for="email">
              {translate("email")}
              <span className="text-danger">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              placeholder={translate("email_placeholder")}
              type="email"
              value={input.email.value}
              onChange={input.email.onChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeForm;
