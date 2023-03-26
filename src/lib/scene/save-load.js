import { loadTileMapFromJSON, saveTileMaptoJSON } from '@/lib/map'
import { reloadScene } from '.'

const save = (saveButton, saveLink) => {
  const mapData = saveTileMaptoJSON()
  const downloadNode = saveLink
  downloadNode.setAttribute('href', mapData)
  downloadNode.setAttribute('download', 'tile-map.json')
  downloadNode.setAttribute('id', 'saveLink')
  downloadNode.innerText = '- Save link -'
  saveButton.after(downloadNode)
}

const load = (loadButton) => {
  const loadNode = document.createElement('input')
  loadNode.type = 'file'

  loadButton.after(loadNode)
  loadNode.onchange = () => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const tileMap = loadTileMapFromJSON(e.target.result)
      reloadScene(tileMap)
    }

    reader.readAsText(loadNode.files[0])
  }

  loadNode.click()
  loadNode.remove()
}

export { save, load }
