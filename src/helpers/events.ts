export const enum TerminalEvent {
  ON_COMMAND = 'onCommand',
  ON_COMMAND_NOT_FOUND = 'onCommand404',
  ON_PROCESS_START = 'onProcessStart',
  ON_PROCESS_END = 'onProcessStop',
  ON_PROCESS_INTERRUPT = 'onProcessInterrupt',
  ON_INIT = 'onInit'
}

export const dispatchEvent = (event: TerminalEvent, host: HTMLElement, info?: string) => {
  const customEvent = new CustomEvent<string>(event, { detail: info })
  host.dispatchEvent(customEvent)
}
