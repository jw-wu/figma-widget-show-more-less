export function hexColor(hex: string) {
  return (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex))
}


export function percentage(percentage: string | number) {
  return (/^(?:\d*)\.?(?:\d+)%?$/.test(String(percentage)))
}


export function number(number: string | number) {
  return (/^\d+$/.test(String(number)))
}