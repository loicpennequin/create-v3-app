export const getFocusableChildren = (node?: HTMLElement | null | undefined) =>
  node
    ? ([
        ...node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ] as HTMLElement[])
    : [];

export const KEYBOARD = {
  Space: ' ',
  Enter: 'Enter',
  Escape: 'Escape',
  Backspace: 'Backspace',
  Delete: 'Delete',

  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',

  Home: 'Home',
  End: 'End',

  PageUp: 'PageUp',
  PageDown: 'PageDown',

  Tab: 'Tab'
} as const;
