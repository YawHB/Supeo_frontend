import { gql } from '@apollo/client';

export const GET_NOTIFICATION_BY_ID = gql`
  query Notification($notificationId: ID!) {
    notification(id: $notificationId) {
      id
      comment
      status
      timestamp
    }
  }
`;