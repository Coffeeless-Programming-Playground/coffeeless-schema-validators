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
import { ObjectValidator } from '@protocols/object-validator'

interface User {
  name: string
  lastName: string
}

describe('Utils tests', () => {
  test('Ensure object returns an ObjectValidatorBuilder instance', () => {
    const validationBuilder = ObjectValidatorBuilder.init()
    expect(object()).toEqual(validationBuilder)
  })

  test('Ensure object returns an ObjectValidatorBuilder instance with message', () => {
    const customMessage = 'something went wrong'
    const validationBuilder = ObjectValidatorBuilder.init(undefined, customMessage)
    expect(object(customMessage)).toEqual(validationBuilder)
  })

  test('Ensure object returns an ObjectValidatorBuilder instance with object validator', () => {
    const objectSchemaValidation: ObjectValidator = {
      profile: {
        address: {
          street: string().required().build(),
          city: string().required().build()
        },
        phoneNumber: number().required().build()
      },
      anotherField: string().required().build()
    }
    const validationBuilder = ObjectValidatorBuilder.init(objectSchemaValidation)
    expect(object(objectSchemaValidation)).toEqual(validationBuilder)
  })

  test('Ensure object returns an ObjectValidatorBuilder instance with object validator and custom message', () => {
    const customMessage = 'something went wrong'
    const objectSchemaValidation: ObjectValidator = {
      profile: {
        address: {
          street: string().required().build(),
          city: string().required().build()
        },
        phoneNumber: number().required().build()
      },
      anotherField: string().required().build()
    }
    const validationBuilder = ObjectValidatorBuilder.init(objectSchemaValidation, customMessage)
    expect(object(objectSchemaValidation, customMessage)).toEqual(validationBuilder)
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

  test('Ensure optional returns a set of field validator builders', () => {
    const message = faker.random.word()
    const objectSchemaValidation: ObjectValidator = {
      profile: {
        address: {
          street: string().required().build(),
          city: string().required().build()
        },
        phoneNumber: number().required().build()
      },
      anotherField: string().required().build()
    }
    expect(optional().object()).toEqual(ObjectValidatorBuilder.init(undefined, undefined, true))
    expect(optional().object(message)).toEqual(
      ObjectValidatorBuilder.init(undefined, message, true)
    )
    expect(optional().object(objectSchemaValidation)).toEqual(
      ObjectValidatorBuilder.init(objectSchemaValidation, undefined, true)
    )
    expect(optional().object(objectSchemaValidation, message)).toEqual(
      ObjectValidatorBuilder.init(objectSchemaValidation, message, true)
    )
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
