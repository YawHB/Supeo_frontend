import useNotificationFormState from './NotificationFormState.js'
import { Row, Col, FormGroup, Label, Input, Form } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const NotificationForm = ({ notification = {} }) => {
  const [translate] = useTranslation('global')
  const { comment, status, timestamp } = useNotificationFormState(notification)

  console.log(notification)

  return (
    <Form id='notificationForm'>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for='comment'>{translate('admin_comment')}</Label>
            <Input id='comment' name='comment' type='text' value={comment.value} disabled />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for='status'>{translate('status')}</Label>
            <Input id='status' name='status' type='text' value={status.value} disabled />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for='timestamp'>{translate('last_updated')}</Label>
            <Input
              id='timestamp'
              name='timestamp'
              //type="datetime-local"
              value={timestamp.value}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default NotificationForm
