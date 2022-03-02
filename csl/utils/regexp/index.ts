export const matchLoginName = (str: string) => /^[a-z\d]+$/i.test(str)

export const matchName = (str: string) => /^[a-z\d\u2E80-\u9FFF]+$/i.test(str)

export const matchCname = (str: string) => /^[\u2E80-\u9FFF]+$/.test(str)

export const matchPassword = (str: string) => /^[a-z\d,./!@#$*&-]+$/i.test(str)

export const matchEmail = (str: string) => /^(\w+|\w+(\.\w+))+@(\w+\.)+\w+$/.test(str)

export const matchNumber = (str: string) => /^\d+$/.test(str)

export const matchFloatNumber = (str: string) => /^\d+(\.\d+)?$/.test(str)

export const matchIdFromUrl = (str: string): number | null => {
  const regex = /\d+((.|,)\d+)?/
  const result = str.match(regex)

  if (!result) return null

  return +result[0]
}
