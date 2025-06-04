import { useTranslation } from 'react-i18next'
import useTimeEntryFormState from './timeEntryFormState'
import { Form, Row, Col, Input, Label, FormGroup, Alert } from 'reactstrap'

const TimeEntryForm = ({ onSubmit, timeEntry, errorMessages = null }) => {
  const [translate] = useTranslation('global')
  const input = useTimeEntryFormState(timeEntry)

  const handleSubmit = (e) => {
    const { startDate, startTime, endDate, endTime, duration, comment, employeeID, notification } =
      input

    const hasEndDate = endDate.value !== ''
    const hasEndTime = endTime.value !== ''

    const startDateTime = `${startDate.value} ${startTime.value}`
    const endDateTime = hasEndTime
      ? `${hasEndDate ? endDate.value : startDate.value} ${endTime.value}`
      : null
    e.preventDefault()
    onSubmit({
      startDate: startDate.value,
      startTime: startDateTime,
      endDate: hasEndDate ? endDate.value : null,
      endTime: endDateTime,
      duration: duration.value,
      comment: comment.value,
      employeeID: employeeID.value,
      notification: {
        comment: notification.comment.value,
        status: notification.status.value,
        timestamp: notification.timestamp.value,
      },
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
      <Form id='timeEntryForm' onSubmit={handleSubmit}>
        {' '}
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='startDate'>
                {translate('start_date')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='startDate'
                name='startDate'
                type='date'
                value={input.startDate.value}
                onChange={input.startDate.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='startTime'>
                {translate('start_time')}
                <span className='text-danger'>*</span>
              </Label>
              <Input
                id='startTime'
                name='startTime'
                type='time'
                value={input.startTime.value}
                onChange={input.startTime.onChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for='endDate'>{translate('end_date')}</Label>
              <Input
                id='endDate'
                name='endDate'
                type='date'
                value={input.endDate.value}
                //value={state.timeEntryBeingEdited ? reverseString(input.endDate.value) : (input.endDate.value)}
                onChange={input.endDate.onChange}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='endTime'>{translate('end_time')}</Label>
              <Input
                id='endTime'
                name='endTime'
                type='time'
                value={input.endTime.value}
                onChange={input.endTime.onChange}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='duration'>{translate('duration')}</Label>
              <Input
                className='disabled-field'
                id='duration'
                name='duration'
                type='text'
                readOnly
                placeholder={translate('duration')}
                value={input.duration.value}
                onChange={input.duration.onChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for='break'>{translate('break')}</Label>
              <Input
                className='disabled-field'
                id='break'
                name='break'
                type='text'
                placeholder={30}
                value={input.break.value}
                onChange={input.break.onChange}
                required
                disabled
              ></Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='comment'>{translate('comment')}</Label>
              <Input
                id='comment'
                name='comment'
                type='textarea'
                placeholder={translate('write_comment')}
                value={input.comment.value}
                onChange={input.comment.onChange}
                style={{ resize: 'none' }}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default TimeEntryForm
