import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username === 'example' && password === 'password') {
      res.status(200).json({ message: 'Login successful' })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  })
}
