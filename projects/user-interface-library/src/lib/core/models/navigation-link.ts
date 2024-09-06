import { NavigationLinkType } from "../enums/navigation-link-type.enum";

export interface NavigationLink {
    label: string;
    path: string;
    type: NavigationLinkType;
    children?: NavigationLink[];
    /** When nested dropdowns are in use toggle if the label for the parent of the child items should be visible */
    hidenLabelOnNestedChildren?: boolean
}
