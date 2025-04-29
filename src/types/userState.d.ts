import { IconProp } from "@fortawesome/fontawesome-svg-core";

declare type TopNavItem = {
  icon: IconProp;
  link: string;
  label: string;
  activeLocation: string;
};

declare type UserState = {
  topNavItems: TopNavItem[];
};
