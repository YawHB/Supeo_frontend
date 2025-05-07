import { useTranslation } from "react-i18next";
import useTimeEntryFormState from "./CreateTimeEntryFormState";
import { Form, Row, Col, Input, Label, FormGroup } from "reactstrap";

const CreateTimeEntryForm = ({ onSubmit, timeEntry = null }) => {
  const [translate] = useTranslation("global");
  const input = useTimeEntryFormState(timeEntry);
  const handleSubmit = (e) => {
    const { startDate, startTime, endDate, endTime, duration, comment, employeeID, notification } =
      input;

    const hasEndDate = endDate.value !== "";
    const hasEndTime = endTime.value !== "";

    const startDateTime = `${startDate.value} ${startTime.value}`;
    const endDateTime = hasEndTime
      ? `${hasEndDate ? endDate.value : startDate.value} ${endTime.value}`
      : null;
    e.preventDefault();
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
    });
  };

  return (
    <Form id="newTimeEntryForm" onSubmit={handleSubmit}>
      {" "}
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="startDate">{translate("start_date")}</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={input.startDate.value}
              onChange={input.startDate.onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="startTime">{translate("start_time")}</Label>
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
            <Label for="endDate">{translate("end_date")}</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={input.endDate.value}
              onChange={input.endDate.onChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="endTime">{translate("end_time")}</Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              value={input.endTime.value}
              onChange={input.endTime.onChange}
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="duration">{translate("duration")}</Label>
            <Input
              id="duration"
              name="duration"
              type="text"
              readOnly
              placeholder={translate("duration")}
              value={input.duration.value}
              onChange={input.duration.onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="break">{translate("break")}</Label>
            <Input
              id="break"
              name="break"
              type="select"
              placeholder={translate("break")}
              value={input.break.value}
              onChange={input.break.onChange}
              required
              disabled
            >
              <option value="30">{translate("30")}</option>
              <option value="35">{translate("35")}</option>
              <option value="40">{translate("40")}</option>
              <option value="45">{translate("45")}</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {/* //// Jeg tænker måske at formgruppen status her nedenunder skal fjernes, da det nok ikke giver helt mening...
        // ... at en medarbejder kan se status når han er i gang med at oprette en ny time entry
        <Col md={6}>
          <FormGroup>
            <Label for="status">{translate("status")}</Label>
            <Input
              id="status"
              name="status"
              type="select"
              value={input.notification.status.value}
              onChange={input.notification.status.onChange}
            >
              <option value="PENDING">{translate("pending")}</option>
              <option value="GODKENDT">{translate("approve")}</option>
              <option value="AFVIST">{translate("reject")}</option>
            </Input>
          </FormGroup>
        </Col> */}
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="comment">{translate("comment")}</Label>
            <Input
              id="comment"
              name="comment"
              type="textarea"
              placeholder={translate("comment")}
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
