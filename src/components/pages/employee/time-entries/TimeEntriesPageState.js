import { useState } from "react";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useApolloClient } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../../../../hooks/useModalState.js";
import { CREATE_TIME_ENTRY } from "../../../../services/api/time-entry/mutation.js";
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from "../../../../services/api/employee/queries.js";


export const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient();

  const [translate] = useTranslation(`global`);
  const [timeEntriesData, setTimeEntriesData] = useState([]);

  const [isLoadingTimeEntriesForm, setIsLoadingTimeEntriesForm] = useState(false);

  const timeEntryFormModalState = useModalState();
  const newTimeEntryFormModalState = useModalState();

  const timeEntriesColumns = [
    {
      key: "startDate",
      label: translate("start_date"),
      type: "number",
      sort: true,
    },
    {
      key: "startTime",
      label: translate("start_time"),
      type: "number",
      sort: true,
    },
    {
      key: "endDate",
      label: translate("end_date"),
      type: "number",
      sort: true,
    },
    {
      key: "endTime",
      label: translate("end_time"),
      type: "number",
      sort: true,
    },
    {
      key: "duration",
      label: translate("duration"),
      type: "number",
      sort: true,
    },
    {
      key: "break",
      label: translate("break"),
      type: "text",
      sort: true,
    },
    {
      key: "comment",
      label: translate("comment"),
      type: "text",
      sort: true,
    },
    {
      key: "status",
      label: translate("status"),
      type: "view",
      options: [
        { label: translate("pending"), value: "PENDING" },
        { label: translate("approve"), value: "GODKENDT" },
        { label: translate("reject"), value: "AFVIST" },
      ],
      alwaysEnabled: true,
      view: () => (
        <Button
          color="primary"
          outline
          onClick={() => {
            //setEmployeeBeingEdited(employee);
            //employeeFormModalState.openModal();
          }}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </Button>
      ),
    },
  ];

  const { loading: isLoadingTimeEntries } = useQuery(
    GET_TIME_ENTRIES_FOR_EMPLOYEE,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        console.log(data);
        setTimeEntriesData(data.employee);
      },
      onError: (error) => {
        console.error("Error fetching timeEntries:", error);
      },
    }
  );

  const [createTimeEntry, { loading: isSubmittingNewTimeEntry }] = useMutation(
    CREATE_TIME_ENTRY,
    {
      refetchQueries: [GET_TIME_ENTRIES_FOR_EMPLOYEE],
    }
  );

  const handleSubmitNewTimeEntry = (timeEntry) => {
    setIsLoadingTimeEntriesForm(true); // fix typo and add ;
    console.log("Submitting new time entry:", timeEntry);

    createTimeEntry({
      variables: { newTimeEntry: timeEntry },
      onCompleted: () => {
        setIsLoadingTimeEntriesForm(false); // moved inside onCompleted
        newTimeEntryFormModalState.closeModal(); // moved inside onCompleted
            console.log("Submitting new time entry:", timeEntry);

      },
    });
  };

  return {
    translate,
    apolloClient,
    timeEntriesData,
    timeEntriesColumns,
    setTimeEntriesData,
    isLoadingTimeEntries,
    timeEntryFormModalState,
    isLoadingTimeEntriesForm,
    isSubmittingNewTimeEntry,
    handleSubmitNewTimeEntry,
    newTimeEntryFormModalState,
  };
};
