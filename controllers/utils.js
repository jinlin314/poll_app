const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    const err = new Error('You must be logged in')
    err.status = 401
    throw err
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.uid !== req.user.id) {
    const err = new Error(`You can only ${action} yourself.`)
    err.status = 403
    throw err
  }
  next()
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)
module.exports = { mustBeLoggedIn, selfOnly }