import { IconProp } from "@fortawesome/fontawesome-svg-core";

declare type SidebarItem = {
  icon: IconProp;
  link: string;
  label: string;
  activeLocation: string;
};
