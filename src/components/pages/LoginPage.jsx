import { Form, Row, Col, Input, Label, FormGroup, Alert, Button } from 'reactstrap'
import { useLoginPageState } from './employee/loginPageState.js'

export function LoginPage() {
  const state = useLoginPageState()

  return (
    <>
      {state.errors.lenght > 0 && (
        <Alert color='danger' className='mb-4' timeout={{ enter: 150, exit: 150 }}>
          <ul className='mb-0 list-unstyled'>
            {state.errors.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form onSubmit={state.onSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='email' label='Email' name='email'>
                <span className='text-danger'>*</span>
                {state.translate('email')}
                <Input
                  id='email'
                  name='email'
                  placeholder={state.translate('email_placeholder')}
                  type='email'
                  value={state.values.email}
                  onChange={state.onChange}
                ></Input>
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='password' label='password' name='password'>
                <span className='text-danger'>*</span>
                {state.translate('password')}
                <Input
                  id='password'
                  name='password'
                  placeholder={state.translate('password_placeholder')}
                  type='text'
                  value={state.values.password}
                  onChange={state.onChange}
                ></Input>
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Button type='submit'>Login</Button>
      </Form>
    </>
  )
}
