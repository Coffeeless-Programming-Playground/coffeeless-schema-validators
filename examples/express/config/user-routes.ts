import { Express, Request } from 'express'
import { User } from '../interfaces/user-interface'
import { makeStandardSchemaValidator } from '../factories/standard-schema-validator-factory'
import { makeFailFastSchemaValidator } from '../factories/fail-fast-schema-validator-factory'

export default (app: Express): void => {
  app.post('/v1/create', (req: Request, res) => {
    const saveUser = (input: User) => {
      const errors = makeStandardSchemaValidator().validate(input) as Error[]
      if (errors && errors.length) {
        res.status(400)
        res.send({ error: `Bad request exception: ${errors.toString()}` })
      } else {
        res.status(200)
        res.send({ message: `Saved user!` })
      }
    }

    saveUser(req.body)
  })
  app.post('/v2/create', (req: Request, res) => {
    const saveUser = (input: User) => {
      try {
        makeFailFastSchemaValidator().validate(input) as Error[]
        res.status(200)
        res.send({ message: `Saved user!` })
      } catch (error: any) {
        res.status(400)
        res.send({ error: `Bad request exception: ${error.message}` })
      }
    }
    saveUser(req.body)
  })
}
