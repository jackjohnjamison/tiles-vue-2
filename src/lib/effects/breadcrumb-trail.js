import { crumbWidth } from '@/lib/constants'
import { tileIndexToPosition } from '@/lib/map'
import { drawEllipse, drawPin } from '.'

const transparentFill = 'rgba(150, 150, 150, 0.8)'

const breadcrumbTrail = (path, color, pin, ctx) => {
  const pathLength = path.length

  path.forEach((step, i) => {
    const [x, y] = step
    const position = tileIndexToPosition({ x, y })

    drawEllipse(position, color, crumbWidth, ctx)

    if (pin && i === pathLength - 1) {
      drawPin(color, transparentFill, ctx, position)
    }
  })
}

export { breadcrumbTrail }
