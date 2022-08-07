export const fileToBase64 = async (file): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = (e) => res(e?.target?.result as string)
    reader.onerror = (e) => rej(e)
    reader.readAsDataURL(file)
  })
}
