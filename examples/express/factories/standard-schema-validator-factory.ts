import {
  array,
  boolean,
  InputValidator,
  number,
  object,
  schemaValidator,
  string,
  timestamp
} from 'coffeeless-schema-validators/dist'
import { User } from '../interfaces/user-interface'

export const makeStandardSchemaValidator = (): InputValidator => {
  return schemaValidator<User>({
    timestamp: timestamp().expired().build(),
    name: string().required().min(2).build(),
    email: string().required().email().build(),
    pets: array()
      .required()
      .min(2)
      .elementsMinSize(3)
      .elementsMatchPattern(/^(cat|dog|lion|tiger|elephant|zebra|giraffe|bear|wolf|rabbit|fox|an)$/)
      .build(),
    age: number().required().min(18).build(),
    info: object().required().build(),
    password: string().required().build(),
    confirmPassword: string().required().equal('password').build(),
    phoneNumber: string()
      .required()
      .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
      .build(),
    isAlive: boolean().required().build()
  })
}
