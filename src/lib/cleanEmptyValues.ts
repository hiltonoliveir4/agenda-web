export function cleanEmptyValues(data: { [key: string]: any }) {
  return Object.keys(data)
    .filter(key => data[key] !== undefined && data[key] !== null)
    .reduce((acc: { [key: string]: any }, cur) => {
      acc[cur] = data[cur]
      return acc
    }, {})
}
