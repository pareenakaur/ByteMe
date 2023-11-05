export function passwordMatcher(prev_password, password) {
    if (!password) return "Password can't be empty."
    if (prev_password!=password) return 'Password did not match.'
    return ''
  }
  