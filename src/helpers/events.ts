export enum TerminalEvent {
  ON_COMMAND = 'onCommand',
  ON_COMMAND_NOT_FOUND = 'onCommand404',
  ON_INIT = 'onInit'
}

export const dispatchEvent = (event: TerminalEvent, host: HTMLElement) => {
  const customEvent = new CustomEvent(event)
  host.dispatchEvent(customEvent)
}
