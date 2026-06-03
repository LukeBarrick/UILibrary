/**
 * Enum of standard reasons why a modal was dismissed programmatically
 * (rather than closed with a result).
 */
export enum UiModalDismissReason {
  /** The user clicked the backdrop. */
  BackdropClick = 'backdrop-click',

  /** The user pressed the Escape key. */
  Esc = 'esc',
}
