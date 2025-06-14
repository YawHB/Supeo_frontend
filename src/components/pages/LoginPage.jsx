import { Form, Row, Col, Input, Label, FormGroup, Alert, Button } from 'reactstrap'
import { useLoginPageState } from './employee/loginPageState.js'
import Logo from '../../assets/Logo.jsx'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function LoginPage() {
  const state = useLoginPageState()

  document.title = state.translate('login.login_title')

  return (
    <>
      {state.errors && (
        <Alert color='danger' className='mb-4' timeout={{ enter: 150, exit: 150 }}>
          <ul className='mb-0 list-unstyled'>
            {state.errors.map((message, i) => (
              <li key={i}>{message.message}</li>
            ))}
          </ul>
        </Alert>
      )}
      <div className='login-container'>
        <Form onSubmit={state.onSubmit} style={{ position: 'relative' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Logo
              className='px-3'
              text=''
              logoColor='#374c45'
              textColor='#FCFFFF'
              imgStyle={{ height: '3rem' }}
              textStyle={{ fontSize: '2rem', fontWeight: '600' }}
            />
          </div>
          <div style={{ marginTop: '-1rem' }}>
            <Row>
              <Col md={6} className='mt-2 mx-auto'>
                <h1 className='text-left mb-4'>{state.translate('login.login')}</h1>
                <FormGroup>
                  <Input
                    id='email'
                    name='email'
                    className={`username-button ${state.values.email ? 'input-filled' : ''}`}
                    type='email'
                    placeholder={state.emailPlaceholder}
                    value={state.values.email}
                    onChange={state.onChange}
                    onFocus={() => {
                      state.setEmailPlaceholder('')
                      state.setEmailEscapePressedOnce(false)
                    }}
                    onBlur={() => state.setEmailPlaceholder(state.translate('login.email'))}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        if (!state.emailEscapePressedOnce) {
                          state.onChange({ target: { name: 'email', value: '' } })
                          state.setEmailEscapePressedOnce(true)
                        } else {
                          e.target.blur()
                        }
                      }
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6} className='mt-2 mx-auto'>
                <FormGroup style={{ position: 'relative' }}>
                  <Input
                    id='password'
                    name='password'
                    className={`password-button ${state.values.password ? 'input-filled' : ''}`}
                    type={state.showPassword ? 'text' : 'password'}
                    placeholder={state.passwordPlaceholder}
                    value={state.values.password}
                    onChange={state.onChange}
                    onFocus={() => {
                      state.setPasswordPlaceholder('')
                      state.setPasswordEscapePressedOnce(false)
                    }}
                    onBlur={() => state.setPasswordPlaceholder(state.translate('login.password'))}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        if (!state.passwordEscapePressedOnce) {
                          state.onChange({ target: { name: 'password', value: '' } })
                          state.setPasswordEscapePressedOnce(true)
                        } else {
                          e.target.blur()
                        }
                      }
                    }}
                  />

                  <FontAwesomeIcon
                    icon={state.showPassword ? faEye : faEyeSlash}
                    onClick={() => state.setShowPassword(!state.showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#374c45',
                      fontSize: '1.2rem',
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col
                md={6}
                className='mx-auto d-flex align-items-center mb-3'
                style={{ gap: '0.5rem', justifyContent: 'flex-start' }}
              >
                <Input
                  type='checkbox'
                  id='rememberMe'
                  checked={state.rememberMe}
                  onChange={() => state.setRememberMe(!state.rememberMe)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <Label
                  for='rememberMe'
                  className='mb-0'
                  style={{ userSelect: 'none', cursor: 'pointer', color: '#374c45', fontWeight: '500' }}
                >
                  {state.translate('login.remember_me')}
                </Label>
                <span
                  onClick={() => {}}
                  style={{
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    color: '#374c45',
                    fontWeight: '500',
                    alignSelf: 'flex-end',
                    userSelect: 'none',
                  }}
                >
                  {state.translate('login.forgot_password')}
                </span>
              </Col>
            </Row>

            <div className='text-center mt-3'>
              <Row>
                <Col md={6} className='mx-auto' style={{ marginTop: '-0.5rem' }}>
                  <Button type='submit' className='login-button'>
                    {state.translate('login.login')}
                  </Button>
                </Col>
              </Row>
              <div style={{ marginTop: '1rem', color: '#374c45', fontWeight: '500' }}></div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
