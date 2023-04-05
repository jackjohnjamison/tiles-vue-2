const randomVariation = (start, range, int = false) => {
  const variatedNumber = start + (Math.random() * range - range / 2)

  if (int) return Math.floor(variatedNumber)
  return variatedNumber
}

export { randomVariation }
