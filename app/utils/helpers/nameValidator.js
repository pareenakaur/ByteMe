export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  if (name.includes(' ')) return 'Name cannot have whitespaces in between.'
  return ''
}
