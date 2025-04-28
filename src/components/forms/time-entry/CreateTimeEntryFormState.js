import { useInput } from '../../../hooks/useInput';

const useTimeEntryFormState = (timeEntry) => {
    return {
        //timeEntryId,
        startTime: useInput(timeEntry?.startTime ?? ''),
        endTime: useInput(timeEntry?.endTime ?? ''),
        date: useInput(timeEntry?.date ?? ''),
        duration: useInput(timeEntry?.duration ?? ''),
        comment: useInput(timeEntry?.comment ?? ''),
        employeeID: useInput(timeEntry?.employeeID ?? '20'),
        notification: {
            comment: useInput(timeEntry?.notification?.comment ?? ''),
            timestamp: useInput(timeEntry?.notification?.timestamp ?? ''),
            status: useInput(timeEntry?.notification?.status ?? 'PENDING'),
        },
    };
};
export default useTimeEntryFormState;

//const timeEntryId = useInput(timeEntry?.id ?? null);
// const startTime = useInput(timeEntry?.startTime ?? '');
// const endTime = useInput(timeEntry?.endTime ?? '');
// const date = useInput(timeEntry?.date ?? '');
// const duration = useInput(timeEntry?.duration ?? '');
// const comment = useInput(timeEntry?.comment ?? '');
// const employeeID = useInput(timeEntry?.employeeID ?? '20');
