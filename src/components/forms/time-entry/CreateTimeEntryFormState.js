import { useEffect } from 'react';
import { useInput } from '../../../hooks/useInput';
import { calculateWorkHours } from '../../../utils/CalculateWorkHours.js';

const useTimeEntryFormState = (timeEntry) => {
    const startDate = useInput(timeEntry?.startDate ?? '');
    const startTime = useInput(timeEntry?.startTime ?? '');
    const endDate = useInput(timeEntry?.endDate ?? '');
    const endTime = useInput(timeEntry?.endTime ?? '');
    const duration = useInput('');

    useEffect(() => {
        if (
            isTimeRangeComplete(
                startDate.value,
                startTime.value,
                endDate.value,
                endTime.value
            )
        ) {
            const result = calculateWorkHours(
                startDate.value,
                startTime.value,
                endDate.value,
                endTime.value
            );
            duration.onChange({ target: { value: result } });
        }
    }, [startDate.value, startTime.value, endDate.value, endTime.value]);

    return {
        startDate,
        startTime,
        endDate,
        endTime,
        duration,
        break: useInput(timeEntry?.break ?? ''),
        comment: useInput(timeEntry?.comment ?? ''),
        adminComment: useInput(timeEntry?.adminComment ?? ''),
        employeeID: useInput(timeEntry?.employeeID ?? '20'),
        notification: {
            comment: useInput(timeEntry?.notification?.comment ?? ''),
            timestamp: useInput(timeEntry?.notification?.timestamp ?? ''),
            status: useInput(timeEntry?.notification?.status ?? 'PENDING'),
        },
    };
};

function isTimeRangeComplete(startDate, startTime, endDate, endTime) {
    return startDate && startTime && endDate && endTime;
}
export default useTimeEntryFormState;
