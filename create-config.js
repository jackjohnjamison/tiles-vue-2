/* eslint-disable no-undef */ // This was writen in a hurry. Sorry you had to read it.
const fs = require('fs')
const path = require('path')

const mapsDirectory = path.resolve(__dirname, './src/maps')
const configPath = path.resolve(__dirname, './src/configs/map-config.json')

const getMaps = () => {
  const maps = []
  const mapFiles = fs.readdirSync(mapsDirectory, { withFileTypes: false })

  mapFiles.forEach((file) => {
    const filePath = path.resolve(mapsDirectory, file)
    const jsonString = fs.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r'
    })
    const mapJSON = JSON.parse(jsonString)

    maps.push(mapJSON)
  })

  return { maps, mapFiles }
}

const createConfig = ({ maps, mapFiles }) => {
  const mapConfigJSON = {
    mapList: {}
  }

  maps.forEach((map, i) => {
    const { mapTitle, entryPoints, xTiles, yTiles, id } = map

    mapConfigJSON.mapList[mapFiles[i].replace('.json', '')] = {
      mapTitle,
      entryPoints,
      xTiles,
      yTiles,
      id
    }
  })

  fs.writeFile(configPath, JSON.stringify(mapConfigJSON, null, 2), 'utf8', () => {
    console.log('mapConfig JSON saved')
  })
}

createConfig(getMaps())
