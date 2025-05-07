import { useState } from "react";
import { useTranslation } from "react-i18next";
import showToast from "../../../lib/toast/toast.js";
import exportTableData from "../../../lib/export/exportTableData.js";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { GET_ALL_TIME_ENTRIES } from "../../../../services/api/time-entry/queries.js";
import { UPDATE_TIME_ENTRY_STATUS } from "../../../../services/api/admin/mutations.js";

const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient();
  const [translate] = useTranslation("global");
  const [timeEntries, setTimeEntries] = useState([]);
  const [updateTimeEntryStatus] = useMutation(UPDATE_TIME_ENTRY_STATUS);

  const timeEntriesTableColumns = [
    { key: "id", label: translate("id"), type: "text", sort: true },
    { key: "firstName", label: translate("first_name"), type: "text", sort: true },
    { key: "lastName", label: translate("last_name"), type: "text", sort: true },
    { key: "date", label: translate("date"), type: "date", sort: true },
    { key: "startTime", label: translate("start_time"), type: "text", sort: true },
    { key: "endTime", label: translate("end_time"), type: "text", sort: true },
    { key: "duration", label: translate("duration"), type: "text", sort: true },
    { key: "comment", label: translate("comment"), type: "text", sort: true },
    {
      key: "status",
      label: translate("status"),
      type: "select",
      options: [
        { label: translate("pending"), value: "AFVENTER" },
        { label: translate("approve"), value: "GODKENDT" },
        { label: translate("reject"), value: "AFVIST" },
        { label: translate("underway"), value: "IGANG" },
      ],
      alwaysEnabled: true,
    },
  ];

  const { loading: isLoadingTimeEntries } = useQuery(GET_ALL_TIME_ENTRIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setTimeEntries(data.timeEntries),
  });

  const handleStatusChange = async (entryId, newStatus) => {
    const updatedEntries = timeEntries.map((entry) =>
      entry.id === entryId ? { ...entry, status: newStatus } : entry
    );
    setTimeEntries(updatedEntries);

    try {
      await updateTimeEntryStatus({
        variables: { id: entryId, status: newStatus },
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleExportTable = () => {
    const startMsg = translate("export_table.start");
    showToast(startMsg, "info");

    apolloClient
      .query({ query: GET_ALL_TIME_ENTRIES, fetchPolicy: "network-only" })
      .then((result) => {
        const data = result.data?.timeEntries ?? [];
        const today = new Date().toISOString().split("T")[0];
        return exportTableData({
          data,
          filename: `${translate(`export_table.time_entries_overview`)} ${today}`,
          columns: timeEntriesTableColumns.filter((col) => col.key !== "id"),
          //columns: timeEntriesTableColumns,
          strategy: "xlsx",
        });
      })
      .then(
        () => {
          const successMsg = translate("export_table.success");
          showToast(successMsg, "success");
        },
        () => {
          const errorMsg = translate("export_table.error");
          showToast(errorMsg, "error");
        }
      );
  };

  return {
    translate,
    timeEntries,
    apolloClient,
    handleExportTable,
    handleStatusChange,
    isLoadingTimeEntries,
    timeEntriesTableColumns,
  };
};

export default useTimeEntriesPageState;
