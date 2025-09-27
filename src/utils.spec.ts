import faker from '@faker-js/faker'
import { ConditionalValidator } from '@validators/conditional-validator'
import { ForbiddenFieldInputValidator } from '@validators/forbidden-validator'
import { CompositeValidator } from '@validators/validation-composite'
import {
  ArrayValidatorBuilder,
  BooleanValidatorBuilder,
  NumberValidatorBuilder,
  ObjectValidatorBuilder,
  StringValidatorBuilder,
  TimestampValidatorBuilder
} from '@validators/validator-builders'
import {
  array,
  boolean,
  forbidden,
  number,
  object,
  optional,
  schemaValidator,
  string,
  timestamp,
  when
} from './utils'

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

  test('Ensure timestamp returns an TimestampValidatorBuilder instance', () => {
    const validationBuilder = TimestampValidatorBuilder.init()
    expect(timestamp()).toEqual(validationBuilder)
  })

  test('Ensure when returns an ConditionalValidator instance', () => {
    const whenConditionalValidation = {
      is: string().required().build(),
      then: number().required().build(),
      otherwise: number().min(12).build()
    }
    const validationBuilder = [new ConditionalValidator('any_field', whenConditionalValidation)]
    expect(when('any_field', whenConditionalValidation)).toEqual(validationBuilder)
  })

  test('Ensure forbidden returns an ForbiddenFieldInputValidator instance', () => {
    const validationBuilder = [new ForbiddenFieldInputValidator()]
    expect(forbidden()).toEqual(validationBuilder)
  })

  test('Ensure optional returns an a set of field validator builders', () => {
    const message = faker.random.word()
    expect(optional().object(message)).toEqual(ObjectValidatorBuilder.init(message, true))
    expect(optional().boolean(message)).toEqual(BooleanValidatorBuilder.init(message, true))
    expect(optional().number(message)).toEqual(NumberValidatorBuilder.init(message, true))
    expect(optional().array(message)).toEqual(ArrayValidatorBuilder.init(message, true))
    expect(optional().string(message)).toEqual(StringValidatorBuilder.init(message, true))
    expect(optional().timestamp(message)).toEqual(TimestampValidatorBuilder.init(message, true))
    expect(
      optional().when(message, {
        is: [],
        then: [],
        otherwise: []
      })
    ).toEqual([
      new ConditionalValidator(
        message,
        {
          is: [],
          then: [],
          otherwise: []
        },
        true
      )
    ])
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
