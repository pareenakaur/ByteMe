export function descValidator(desc) {
  if (!desc) return "Description can't be empty."
  if (desc.length > 120) return 'Description is too long.'
  return ''
}
