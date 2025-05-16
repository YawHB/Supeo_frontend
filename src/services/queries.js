import { gql } from "@apollo/client";

export const USER_MENU_LINKS = gql`
  query UserMenuLinks($employeeId: Int!) {
    userMenuLinks(employeeId: $employeeId) {
      menuItem
    }
  }
`;
