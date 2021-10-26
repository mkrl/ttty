export const COLOR_SCHEMES = ['default', 'solarized', 'light', 'ubuntu', 'classic', 'borland', 'gotham', 'horizon', 'icorange', 'lavandula', 'lunaria', 'amber']

const COLOR_MAP: Record<string, Record<string, string>> = {
  default: {
    '--terminal-bg-color': 'black',
    '--terminal-fg-color': 'white',
    '--terminal-accent-color': '#ffff7d',
    '--terminal-error-color': '#cc1010'
  },
  solarized: {
    '--terminal-bg-color': '#073642',
    '--terminal-fg-color': '#fdf6e3',
    '--terminal-accent-color': '#b58900',
    '--terminal-error-color': '#dc322f'
  },
  light: {
    '--terminal-bg-color': 'white',
    '--terminal-fg-color': 'black',
    '--terminal-accent-color': '#b58900',
    '--terminal-error-color': '#9f211f'
  },
  ubuntu: {
    '--terminal-bg-color': '#300B23',
    '--terminal-fg-color': 'white',
    '--terminal-accent-color': '#89DE49',
    '--terminal-error-color': '#E0232C'
  },
  borland: {
    '--terminal-bg-color': '#0015a0',
    '--terminal-fg-color': '#ffff4e',
    '--terminal-accent-color': '#a8ff60',
    '--terminal-error-color': '#ff6c60'
  },
  gotham: {
    '--terminal-bg-color': '#0a0f14',
    '--terminal-fg-color': '#98d1ce',
    '--terminal-accent-color': '#26a98b',
    '--terminal-error-color': '#c33027'
  },
  horizon: {
    '--terminal-bg-color': '#fdf0ed',
    '--terminal-fg-color': '#1c1e26',
    '--terminal-accent-color': '#1eb980',
    '--terminal-error-color': '#da103f'
  },
  icorange: {
    '--terminal-bg-color': '#262626',
    '--terminal-fg-color': '#ffcb83',
    '--terminal-accent-color': '#a4a900',
    '--terminal-error-color': '#c13900'
  },
  lavandula: {
    '--terminal-bg-color': '#050014',
    '--terminal-fg-color': '#736e7d',
    '--terminal-accent-color': '#337e6f',
    '--terminal-error-color': '#7d1625'
  },
  lunaria: {
    '--terminal-bg-color': '#ebe4e1',
    '--terminal-fg-color': '#484646',
    '--terminal-accent-color': '#497d46',
    '--terminal-error-color': '#783c1f'
  },
  amber: {
    '--terminal-bg-color': '#2b1900',
    '--terminal-fg-color': '#ff9400',
    '--terminal-accent-color': '#ff9400',
    '--terminal-error-color': '#ff9400'
  },
  classic: {
    '--terminal-bg-color': 'black',
    '--terminal-fg-color': '#87DE47',
    '--terminal-accent-color': '#87DE47',
    '--terminal-error-color': '#ED262E'
  }
}

let currentScheme = 'default'

export const setColor = (color: string) => {
  if (COLOR_SCHEMES.includes(color) || color === 'random') {
    const colorSchemes = COLOR_SCHEMES.filter(c => c !== currentScheme)
    const endColor = color === 'random' ? colorSchemes[Math.floor(Math.random() * colorSchemes.length)] : color
    const scheme = COLOR_MAP[endColor]
    Object.keys(scheme).forEach(key => {
      document.documentElement.style
        .setProperty(key, scheme[key])
    })
    currentScheme = endColor
    return `Color scheme set to ${endColor}`
  } else {
    return `Color scheme "${color}" was not found. <br/><br/>Available schemes: ${[...COLOR_SCHEMES, 'random'].join(', ')}.`
  }
}
