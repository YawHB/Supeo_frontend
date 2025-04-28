import { useTranslation } from 'react-i18next';
import { Form, Row, Col, Input, Label, FormGroup } from 'reactstrap';
import useTimeEntryFormState from './CreateTimeEntryFormState';

const CreateTimeEntryForm = ({ onSubmit, timeEntry = null }) => {
    const [translate] = useTranslation('global');
    const input = useTimeEntryFormState(timeEntry);

    const handleSubmit = (e) => {
        console.log(input);
        e.preventDefault();
        console.log(input.startTime.value);
        onSubmit({
            startTime: input.startTime.value,
            endTime: input.endTime.value,
            date: input.date.value,
            duration: input.duration.value,
            comment: input.comment.value,
            notification: input.notification.comment,
            timestamp: input.endTime.value,
            status: input.notification.status,
        });
        console.log(input);
        console.log(timeEntry);
    };

    return (
        <Form id="newTimeEntryForm" onSubmit={handleSubmit}>
            {' '}
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="date">{translate('date')}</Label>
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            value={input.date.value}
                            onChange={input.date.onChange}
                            required
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label for="startTime">{translate('start_time')}</Label>
                        <Input
                            id="startTime"
                            name="startTime"
                            type="time"
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
                        <Label for="endTime">{translate('end_time')}</Label>
                        <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={input.endTime.value}
                            onChange={input.endTime.onChange}
                            required
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label for="duration">{translate('duration')}</Label>
                        <Input
                            id="duration"
                            name="duration"
                            type="number"
                            placeholder={translate('duration')}
                            value={input.duration.value}
                            onChange={input.duration.onChange}
                            required
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label for="comment">{translate('comment')}</Label>
                        <Input
                            id="comment"
                            name="comment"
                            type="textarea"
                            placeholder={translate('comment')}
                            value={input.comment.value}
                            onChange={input.comment.onChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateTimeEntryForm;
