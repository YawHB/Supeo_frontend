import { useInput } from '../../../hooks/useInput';

const useTimeEntryFormState = (timeEntry) => {
    const startTime = useInput(timeEntry?.startTime ?? '');
    const endTime = useInput(timeEntry?.endTime ?? '');
    const date = useInput(timeEntry?.date ?? '');
    const duration = useInput(timeEntry?.duration ?? '');
    const comment = useInput(timeEntry?.comment ?? '');

    const input = {
        startTime,
        endTime,
        date,
        duration,
        comment,
        notification: {
            comment: '',
            timestamp: endTime,
            status: 'PENDING',
        },
    };
    return input;
};
export default useTimeEntryFormState;
