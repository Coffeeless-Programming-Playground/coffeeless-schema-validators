import express, { Request } from 'express'
import { email, min, required, valid, CompositeValidator } from 'coffeeless-schema-validators/dist'

interface User {
  name: string
  email: string
  phoneNumber: string
}

const app = express()
app.use(express.json())

const schema = new CompositeValidator<User>({
  name: required().min(2).build(),
  email: required().email().build(),
  phoneNumber: required()
    .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .build()
})

// const schema = new CompositeValidator<User>({
//   name: required().min(2).build(),
//   email: required().email().build(),
//   phoneNumber: required().valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).build()
// }).failFast()

app.post('/', (req: Request, res) => {
  const saveUser = (input: User) => {
    console.log(JSON.stringify(input, null, 2))
    const errors = schema.validate(input)
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
