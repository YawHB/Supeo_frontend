import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import { useModalState } from '../../../../hooks/useModalState.js';
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from '../../../../services/api/employee/queries.js';
import { CREATE_TIME_ENTRY } from '../../../../services/api/time-entry/mutation.js';
export const useTimeEntriesPageState = () => {
    const apolloClient = useApolloClient();

    const [translate] = useTranslation(`global`);
    const [timeEntriesData, setTimeEntriesData] = useState([]);

    const [isLoadingTimeEntriesForm, setIsLoadingTimeEntriesForm] =
        useState(false);

    const timeEntryFormModalState = useModalState();
    const newTimeEntryFormModalState = useModalState();

    const timeEntriesColumns = [
        {
            key: 'date',
            label: translate('date'),
            type: 'number',
            sort: true,
        },
        {
            key: 'startTime',
            label: translate('start_time'),
            type: 'number',
            sort: true,
        },
        {
            key: 'endTime',
            label: translate('end_time'),
            type: 'number',
            sort: true,
        },
        {
            key: 'duration',
            label: translate('duration'),
            type: 'number',
            sort: true,
        },
        {
            key: 'comment',
            label: translate('comment'),
            type: 'text',
            sort: true,
        },
        {
            key: '',
            label: ``,
            alwaysEnabled: true,
        },
    ];

    const { loading: isLoadingTimeEntries } = useQuery(
        GET_TIME_ENTRIES_FOR_EMPLOYEE,
        {
            fetchPolicy: 'cache-and-network',
            onCompleted: (data) => {
                console.log(data);
                setTimeEntriesData(data.employee);
            },
            onError: (error) => {
                console.error('Error fetching timeEntries:', error);
            },
        }
    );

    const [createTimeEntry, { loading: isSubmittingNewTimeEntry }] =
        useMutation(CREATE_TIME_ENTRY, {
            refetchQueries: [GET_TIME_ENTRIES_FOR_EMPLOYEE],
        });

    const handleSubmitNewTimeEntry = (timeEntry) => {
        setIsLoadingTimeEntriesForm(true); // fix typo and add ;

        createTimeEntry({
            variables: { newTimeEntry: timeEntry },
            onCompleted: () => {
                setIsLoadingTimeEntriesForm(false); // moved inside onCompleted
                newTimeEntryFormModalState.closeModal(); // moved inside onCompleted
            },
        });
    };

    return {
        newTimeEntryFormModalState,
        isLoadingTimeEntries,
        isLoadingTimeEntriesForm,
        isSubmittingNewTimeEntry,
        translate,
        timeEntriesData,
        setTimeEntriesData,
        handleSubmitNewTimeEntry,
        apolloClient,
        timeEntryFormModalState,
        timeEntriesColumns,
    };
};
