export function emailVerifier(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Enter your email"
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  // if (!isExist(email)) return "You dont have an existing account with us." //api call to see if email exist in the user database return 
  return ''
}
