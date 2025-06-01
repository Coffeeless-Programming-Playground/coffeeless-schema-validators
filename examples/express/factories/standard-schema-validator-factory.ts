import { schemaValidator, InputValidator, required } from 'coffeeless-schema-validators/dist'
import { User } from '../interfaces/user-interface'

export const makeStandardSchemaValidator = (): InputValidator => {
  return schemaValidator<User>({
    name: required().min(2).build(),
    email: required().email().build(),
    phoneNumber: required()
      .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
      .build()
  })
}
