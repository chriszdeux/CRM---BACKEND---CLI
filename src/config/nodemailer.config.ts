module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.CRYPTO_EMAIL,
    password: process.env.EMAIL_PASSWORD
  }
}