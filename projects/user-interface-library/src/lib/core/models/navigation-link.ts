import { NavigationLinkType } from "../enums/navigation-link-type.enum";

export interface NavigationLink {
    label: string;
    path: string;
    type: NavigationLinkType;
    children?: NavigationLink[];
}