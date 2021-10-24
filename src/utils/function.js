export const checkUnit = value => {
  return (
    (typeof value === 'number' && `${value}px`) ||
    ((value.includes('px') || value.includes('%') || value.includes('rem')) &&
      value) ||
    `${value}px`
  )
}
