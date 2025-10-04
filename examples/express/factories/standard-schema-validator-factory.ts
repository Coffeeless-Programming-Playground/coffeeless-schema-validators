import {
  array,
  boolean,
  forbidden,
  InputValidator,
  number,
  object,
  optional,
  schemaValidator,
  string,
  timestamp,
  when
} from 'coffeeless-schema-validators/dist'
import { User } from '../interfaces/user-interface'

export const makeStandardSchemaValidator = (): InputValidator => {
  return schemaValidator<User>({
    timestamp: timestamp().expired().build(),
    name: string().required().min(2).max(20).build(),
    surname: forbidden(),
    lastName: when('name', {
      is: string().required().min(5).build(),
      then: string().min(10).build(),
      otherwise: string().min(20).build()
    }),
    email: string().required().email().build(),
    pets: array()
      .required()
      .min(2)
      .elementsMinSize(3)
      .elementsMatchPattern(/^(cat|dog|lion|tiger|elephant|zebra|giraffe|bear|wolf|rabbit|fox|an)$/)
      .build(),
    age: number().required().positive().min(18).build(),
    info: object().required().build(),
    password: string().required().build(),
    confirmPassword: string().required().equal('password').build(),
    phoneNumber: string()
      .required()
      .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
      .build(),
    isAlive: boolean().required().build(),
    isBroke: boolean().isFalse().build(),
    isAMillionarie: boolean().isTrue().build(),
    currentBalance: number().negative().build(),
    ip: optional()
      .string()
      .required()
      .valid(/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/)
      .build()
  })
}
