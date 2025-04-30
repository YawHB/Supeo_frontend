import { useTranslation } from "react-i18next";
import useTimeEntryFormState from "./CreateTimeEntryFormState";
import { Form, Row, Col, Input, Label, FormGroup } from "reactstrap";

const CreateTimeEntryForm = ({ onSubmit, timeEntry = null }) => {
  const [translate] = useTranslation("global");
  const input = useTimeEntryFormState(timeEntry);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date: input.date.value,
      startTime: input.startTime.value,
      endTime: input.endTime.value,
      duration: input.duration.value,
      //break: input.break.value,
      comment: input.comment.value,
      employeeID: input.employeeID.value,
      notification: {
        comment: input.notification.comment.value,
        status: input.notification.status.value,
        timestamp: input.notification.timestamp.value,
      },
    });
  };

  return (
    <Form id="newTimeEntryForm" onSubmit={handleSubmit}>
      {" "}
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="date">{translate("date")}</Label>
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
            <Label for="endTime">{translate("end_time")}</Label>
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
            <Label for="duration">{translate("duration")}</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              placeholder={translate("duration")}
              value={input.duration.value}
              onChange={input.duration.onChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
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
            >
              <option value="30">{translate("30")}</option>
              <option value="GODKENDT">{translate("approve")}</option>
              <option value="AFVIST">{translate("reject")}</option>
            </Input>
          </FormGroup>
        </Col>
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
