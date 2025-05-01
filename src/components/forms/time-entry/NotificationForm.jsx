import useNotificationFormState from "./NotificationFormState.js";
import { Modal, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useTranslation } from "react-i18next";

const NotificationForm = (notification) => {
  const [translate] = useTranslation("global");
  const { comment, status, timestamp } = useNotificationFormState(notification);

  return (
    <Modal id="notificationForm">
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="comment">{translate("comment")}</Label>
            <Input
              id="comment"
              name="comment"
              type="text"
              value={comment.value}
              onChange={comment.onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="status">{translate("status")}</Label>
            <Input
              id="status"
              name="status"
              type="text"
              value={status.value}
              onChange={status.onChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="timestamp">{translate("timestamp")}</Label>
            <Input
              id="timestamp"
              name="timestamp"
              type="datetime-local"
              value={timestamp.value}
              onChange={timestamp.onChange}
              required
            />
          </FormGroup>
        </Col>
      </Row>
    </Modal>
  );
};

export default NotificationForm;
