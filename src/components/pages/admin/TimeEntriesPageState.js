import { useTranslation } from "react-i18next";
import { useQuery, useApolloClient } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_TIME_ENTRIES } from "../../../services/api/time-entry/queries.js";

const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient();
  const [translate] = useTranslation("global");
  const [timeEntries, setTimeEntries] = useState([]);

  const timeEntriesTableColumns = [
    { key: "id", label: translate("id"), type: "text", sort: true },
    {
      key: "startTime",
      label: translate("start_time"),
      type: "text",
      sort: true,
    },
    { key: "endTime", label: translate("end_time"), type: "text", sort: true },
    { key: "duration", label: translate("duration"), type: "text", sort: true },
    { key: "comment", label: translate("comment"), type: "text", sort: true },
    { key: "date", label: translate("date"), type: "date", sort: true },
    {
      key: "status",
      label: "status",
      type: `text`,
      alwaysEnabled: true,
    },
  ];

  const { loading: isLoadingTimeEntries } = useQuery(GET_ALL_TIME_ENTRIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setTimeEntries(data.timeEntries),
  });

  return {
    translate,
    apolloClient,
    isLoadingTimeEntries,
    timeEntriesTableColumns,
    timeEntries,
  };
};

export default useTimeEntriesPageState;
