import { crumbWidth } from '@/lib/constants'
import { tileIndexToPosition } from '@/lib/map'
import { drawEllipse, drawPin } from '.'

const breadcrumbTrail = (path, color, fillColor, pin, ctx) => {
  const pathLength = path.length

  path.forEach((step, i) => {
    const [x, y] = step
    const position = tileIndexToPosition({ x, y })

    drawEllipse(position, color, crumbWidth, ctx)

    if (pin && i === pathLength - 1) {
      drawPin(color, fillColor, ctx, position)
    }
  })
}

export { breadcrumbTrail }
