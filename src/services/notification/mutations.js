import { gql } from "@apollo/client";

export const UPDATE_TIME_ENTRY_STATUS = gql`
  mutation Mutation($notification: NotificationStatusInput!) {
    updateTimeEntryStatus(notification: $notification) {
      id
      status
      comment
    }
  }
`
