import { hexToRGBA } from '@/lib/utils'

// Main colours
export const primary = '#663399' // Rebecca Purple
export const secondary = '#F98948' // Atomic Tangerine

// Signal  colors
export const success = '#60D394' // Emerald
export const info = '#758BFD' // Cornflower Blue
export const warn = '#FCDC4D' // Mustard
export const alert = '#9A031E' // Carmine

// Derived colours
export const warnTrans = hexToRGBA(warn, 0.1) // Transparent verson of warn

/*
  hoveredTileColor = 'rgba(255,255,255,0.1)',
  hoveredTileOutlineColor = 'rgba(255,255,0,0.6)',
  defaultHaloColor = 'yellow',

  entryPointPinColor = 'aqua',

  // const transparentFill = 'rgba(150, 150, 150, 0.8)'

  // #cab6cd thistle
  // #252422 Eerie black
  // #e8e9f3 Ghost white 
  // #e9f1f7 Alice Blue

  // Breadcrums, edit, movement markers
  */
