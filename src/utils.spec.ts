import { CompositeValidator } from '@validators/validation-composite'
import {
  ArrayValidatorBuilder,
  BooleanValidatorBuilder,
  NumberValidatorBuilder,
  ObjectValidatorBuilder,
  StringValidatorBuilder,
  TimestampValidatorBuilder
} from '@validators/validator-builders'
import { array, boolean, number, object, schemaValidator, string, timestamp, when } from './utils'
import { ConditionalValidator } from '@validators/conditional-validator'

interface User {
  name: string
  lastName: string
}

describe('Utils tests', () => {
  test('Ensure object returns an ObjectValidatorBuilder instance', () => {
    const validationBuilder = ObjectValidatorBuilder.init()
    expect(object()).toEqual(validationBuilder)
  })

  test('Ensure boolean returns an BooleanValidatorBuilder instance', () => {
    const validationBuilder = BooleanValidatorBuilder.init()
    expect(boolean()).toEqual(validationBuilder)
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

  test('Ensure when returns an InputValidatorBuilder instance', () => {
    const whenConditionalValidation = {
      is: string().required().build(),
      then: number().required().build(),
      otherwise: number().min(12).build()
    }
    const validationBuilder = [new ConditionalValidator('any_field', whenConditionalValidation)]
    expect(when('any_field', whenConditionalValidation)).toEqual(validationBuilder)
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
