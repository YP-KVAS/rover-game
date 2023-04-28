export const getPaginationItems = (
  current: number,
  max: number
): Array<number | null> => {
  const items: Array<number | null> = [1]

  if (current === 1 && max === 1) {
    return items
  }
  if (current > 4) {
    items.push(null)
  }

  const r = 2
  const r1 = current - r
  const r2 = current + r

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
    items.push(i)
  }

  if (r2 + 1 < max) {
    items.push(null)
  }

  if (r2 < max) {
    items.push(max)
  }

  return items
}
