import { hexToRGBA } from '@/lib/utils'

export const color = {
  // Main colours
  primary: '#663399', // Rebecca Purple
  secondary: '#F98948', // Atomic Tangerine

  // Signal  colors
  success: '#9FFE36', // Lime
  info: '#758BFD', // Cornflower Blue
  warn: '#FCDC4D', // Mustard
  alert: '#9A031E' // Carmine
}

// Derived colours
color.warnTrans = hexToRGBA(color.warn, 0.2) // Transparent verson of warn
color.panelTrans = hexToRGBA('#CAB6CD', 0.5) // Thistle transparent

/*
  // #cab6cd thistle
  // #252422 Eerie black
  // #e8e9f3 Ghost white 
  // #e9f1f7 Alice Blue

  // Breadcrums, edit, movement markers
  */
