const checkUnit = value => {
  return (
    (typeof value === 'number' && `${value}px`) ||
    ((value.includes('px') || value.includes('%') || value.includes('rem')) &&
      value) ||
    `${value}px`
  )
}

const makeRandomKey = () => {
  return (new Date() * Math.random()).toString()
}

export { checkUnit, makeRandomKey }
