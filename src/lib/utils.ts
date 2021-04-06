/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, waitFor)
    return result
  }
}
