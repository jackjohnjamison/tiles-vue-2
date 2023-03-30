export const hexToRGBA = (hex, alpha) => {
  const hexValue = hex.replace('#', '')
  const channels = {}

  if (hexValue.length == 3) {
    channels.r = parseInt(hexValue.slice(0, 1).repeat(2), 16)
    channels.g = parseInt(hexValue.slice(1, 2).repeat(2), 16)
    channels.b = parseInt(hexValue.slice(2, 3).repeat(2), 16)
  } else {
    channels.r = parseInt(hexValue.slice(0, 2), 16)
    channels.g = parseInt(hexValue.slice(2, 4), 16)
    channels.b = parseInt(hexValue.slice(4, 6), 16)
  }

  return `rgba(${channels.r},${channels.g},${channels.b},${alpha})`
}
