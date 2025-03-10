const colors = [
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'DarkSalmon', hex: '#E9967A' },
  { name: 'DarkCyan', hex: '#008B8B' },
  { name: 'SteelBlue', hex: '#4682B4' },
  { name: 'Tomato', hex: '#FF6347' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'SlateGray', hex: '#708090' },
  { name: 'MediumSlateBlue', hex: '#7B68EE' },
  { name: 'MediumOrchid', hex: '#BA55D3' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'MediumSeaGreen', hex: '#3CB371' },
  { name: 'GoldenRod', hex: '#DAA520' },
  { name: 'SandyBrown', hex: '#F4A460' },
  { name: 'LightCoral', hex: '#F08080' },
  { name: 'MediumVioletRed', hex: '#C71585' },
  { name: 'DeepSkyBlue', hex: '#00BFFF' },
  { name: 'FireBrick', hex: '#B22222' },
  { name: 'DarkMagenta', hex: '#8B008B' },
  { name: 'DarkTurquoise', hex: '#00CED1' },
  { name: 'LightSeaGreen', hex: '#20B2AA' },
  { name: 'PowderBlue', hex: '#B0E0E6' },
  { name: 'MediumPurple', hex: '#9370DB' },
  { name: 'Peru', hex: '#CD853F' },
  { name: 'Orchid', hex: '#DA70D6' },
  { name: 'PaleVioletRed', hex: '#DB7093' },
  { name: 'RosyBrown', hex: '#BC8F8F' },
  { name: 'CornflowerBlue', hex: '#6495ED' },
  { name: 'DarkOliveGreen', hex: '#556B2F' },
  { name: 'DodgerBlue', hex: '#1E90FF' },
  { name: 'DarkSlateGray', hex: '#2F4F4F' },
  { name: 'SeaGreen', hex: '#2E8B57' },
  { name: 'SkyBlue', hex: '#87CEEB' },
  { name: 'LightSkyBlue', hex: '#87CEFA' },
  { name: 'DarkViolet', hex: '#9400D3' },
  { name: 'MediumAquamarine', hex: '#66CDAA' },
  { name: 'SpringGreen', hex: '#00FF7F' },
  { name: 'IndianRed', hex: '#CD5C5C' },
  { name: 'Teal', hex: '#008080' },
  { name: 'DarkKhaki', hex: '#BDB76B' },
  { name: 'DarkGoldenRod', hex: '#B8860B' },
  { name: 'CadetBlue', hex: '#5F9EA0' },
  { name: 'Chartreuse', hex: '#7FFF00' },
  { name: 'MediumTurquoise', hex: '#48D1CC' },
  { name: 'PeachPuff', hex: '#FFDAB9' },
  { name: 'MistyRose', hex: '#FFE4E1' },
  { name: 'DarkOrange', hex: '#FF8C00' },
  { name: 'LightSalmon', hex: '#FFA07A' },
];

const getUserColors = () => colors[Math.floor(Math.random() * colors.length)];

export { getUserColors };
