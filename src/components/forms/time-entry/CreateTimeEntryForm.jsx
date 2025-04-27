import { useTransition } from 'react';
import useTimeEntryFormState from './CreateTimeEntryFormState';

const CreateTimeEntryForm = ({ onSubmit, timeEntry = null }) => {
    const [translate] = useTransition('global');
    const input = useTimeEntryFormState(timeEntry);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            startTime: input.startTime.value,
            endTime: input.endTime.value,
            date: input.date.value,
            duration: input.duration.value,
            comment: input.comment.value,
            notificationComment: input.notification.comment,
            timestamp: input.endTime.value,
            status: input.notification.status,
        });
    };
};

export default CreateTimeEntryForm;
