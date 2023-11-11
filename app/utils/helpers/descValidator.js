export function passwordValidator(desc) {
  if (!desc) return "Description can't be empty."
  if (desc.length < 5) return 'Description is too long.'
  return ''
}
