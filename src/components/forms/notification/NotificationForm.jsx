import { useTranslation } from 'react-i18next'
import useNotificationFormState from './NotificationFormState.js'
import { Row, Col, FormGroup, Label, Input, Form } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  statusIconMap,
  statusIconColorClassMap,
} from '../../../components/pages/employee/employeeTimeEntriesPageState.js'

const NotificationForm = ({ notification = {} }) => {
  const [translate] = useTranslation('global')
  const { comment, status, timestamp } = useNotificationFormState(notification)

  const rawStatus = status.value
  const icon = statusIconMap[rawStatus] || null
  const iconClass = statusIconColorClassMap[rawStatus] || ''

  return (
    <Form id='notificationForm'>
      <Row>
        <Col>
          <FormGroup>
            <Label for='status'>{translate('status')}</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Input
                id='status'
                name='status'
                type='text'
                value={status.value}
                className='notification-status'
                disabled
              />
              {icon && (
                <FontAwesomeIcon icon={icon} className={iconClass} style={{ fontSize: '1.2rem' }} />
              )}
            </div>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <FormGroup>
            <Label for='timestamp'>{translate('last_updated')}</Label>
            <Input id='timestamp' name='timestamp' value={timestamp.value} disabled />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for='comment'>{translate('admin_comment')}</Label>
            <Input
              id='comment'
              name='comment'
              type='textarea'
              value={comment.value}
              disabled
              style={{ resize: 'none' }}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default NotificationForm
