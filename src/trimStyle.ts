export function trimStyle(style: string): string {
  return style.replace(/\s*[\r\n]\s*/g, '')
}
