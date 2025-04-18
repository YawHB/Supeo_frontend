import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

const useEmployeesPageState = () => {
    const apolloClient = useApolloClient();

    const [ translate ] = useTranslation(`global`);
    const [ employees, setEmployees ] = useState([]);
    
    const tableColumns = [
        {
            key: 'id',
            label: translate('id'),
            type: 'text',
            sort: true,
        },
        {
            key: 'firstName',
            label: translate('first_name'),
            type: 'text',
            sort: true,
        },
        {
            key: 'lastName',
            label: translate('last_name'),
            type: 'text',
            sort: true,
        },
        {
            key: 'role',
            label: translate('role'),
            type: 'text',
            sort: true,
        },
        {
            key: 'email',
            label: translate('email'),
            type: 'text',
            sort: true,
        },
        {
            key: 'phoneNumber',
            label: translate('phone_number'),
            type: 'text',
            sort: true,
        },
    ];

    return {
        employees,
        setEmployees,
        tableColumns,
        translate,
        apolloClient,
        useEmployeesPageState,
    };
}

export default useEmployeesPageState;