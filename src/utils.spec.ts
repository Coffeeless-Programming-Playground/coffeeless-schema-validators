import { CompositeValidator } from '@validators/validation-composite'
import {
  ArrayValidatorBuilder,
  NumberValidatorBuilder,
  ObjectValidatorBuilder,
  StringValidatorBuilder,
  TimestampValidatorBuilder
} from '@validators/validator-builders'
import { array, number, object, schemaValidator, string, timestamp } from './utils'

interface User {
  name: string
  lastName: string
}

describe('Utils tests', () => {
  test('Ensure object returns an ObjectValidatorBuilder instance', () => {
    const validationBuilder = ObjectValidatorBuilder.init()
    expect(object()).toEqual(validationBuilder)
  })

  test('Ensure number returns an NumberValidatorBuilder instance', () => {
    const validationBuilder = NumberValidatorBuilder.init()
    expect(number()).toEqual(validationBuilder)
  })

  test('Ensure email returns an ArrayValidatorBuilder instance', () => {
    const validationBuilder = ArrayValidatorBuilder.init()
    expect(array()).toEqual(validationBuilder)
  })

  test('Ensure string returns an StringValidatorBuilder instance', () => {
    const validationBuilder = StringValidatorBuilder.init()
    expect(string()).toEqual(validationBuilder)
  })

  test('Ensure timestamp returns an InputValidatorBuilder instance', () => {
    const validationBuilder = TimestampValidatorBuilder.init()
    expect(timestamp()).toEqual(validationBuilder)
  })

  test('Ensure schemaValidator returns a CompositeValidator instance', () => {
    const compositeValidator = new CompositeValidator<User>({
      name: string().required().build(),
      lastName: string().required().build()
    })
    expect(
      schemaValidator<User>({
        name: string().required().build(),
        lastName: string().required().build()
      })
    ).toEqual(compositeValidator)
  })
})
