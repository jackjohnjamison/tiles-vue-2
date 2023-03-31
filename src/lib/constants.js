// Scene constants
export const //
  // Tile dimensions
  tileWidth = 64, // pixels
  tileHeight = 32, // pixels
  maxTiles = 64, // Maximum number of tiles on the x or y axis
  minTiles = 2,
  defaultMapSize = maxTiles / 2,
  maxMapNameLength = 32,
  //
  defaultMapTitle = 'Uncharted Lands',
  //
  // Thickness of padding at canvas bottomd
  paddingBottom = 32,
  paddingTop = 128,
  //
  // Colours
  hoveredTileColor = 'rgba(255,255,255,0.1)',
  hoveredTileOutlineColor = 'rgba(255,255,0,0.6)',
  defaultHaloColor = 'yellow',
  //
  // Physics variables
  friction = 0.8,
  cameraAcceleration = 0.12,
  pathMovementSpeed = 0.18,
  npcPatrolSpeed = 0.08,
  //
  //
  centerOffsetX = tileWidth / 2,
  centerOffsetY = tileHeight / 2,
  tileRatio = tileHeight / tileWidth,
  radians360 = 6.28319,
  baseMarkerSize = 20,
  crumbWidth = 16, // For breadcrumb trails
  pinProportion = 0.86,
  // pinColor = 'lime',
  entryPointPinColor = 'aqua',
  //
  // No operation dummy function
  noop = () => {}

export const imageAssetPath = '/images/'
