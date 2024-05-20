import { faker } from '@faker-js/faker'
import { type Router } from 'express'
import * as log from 'loglevel'

export default (router: Router): void => {
  router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username === 'example' && password === 'password') {
      log.info(`Successful login for user: ${username}`)
      res.status(200).json({
        access_token: faker.string.uuid(),
        token_type: 'GenericToken',
        expires: 3600
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  })
}
