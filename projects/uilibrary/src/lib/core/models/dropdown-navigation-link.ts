import { NavigationLink } from "./navigation-link";

export interface NavigationDropdownLink extends NavigationLink {
    onClick?: (event: MouseEvent) => void;
}
