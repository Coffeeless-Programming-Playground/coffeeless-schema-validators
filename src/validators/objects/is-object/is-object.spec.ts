import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ValidNestedFieldError } from '@errors/valid-nested-field-error'
import faker from '@faker-js/faker'
import { ObjectValidator } from '@protocols/object-validator'
import { IsObjectValidator } from '.'
import { number, optional, string } from '../../../utils'

interface City {
  location: string
}

interface User {
  profile: {
    address: {
      street: string
      city?: City
    }
    phoneNumber: number
  }
  anotherField: string
}

const profileData = {
  address: {
    street: '21st'
  },
  phoneNumber: 123456789
}

const objectInitialValue: User = {
  profile: profileData,
  anotherField: faker.random.word()
}

const objectSchemaValidation: ObjectValidator<User> = {
  profile: {
    address: {
      street: string().required().build(),
      city: optional().object<City>({ location: string().required().build() }).build()
    },
    phoneNumber: number().required().build()
  },
  anotherField: string().required().build()
}

describe('IsObjectValidator tests', () => {
  let sut: IsObjectValidator
  const field = 'user'
  let myObject = {
    someField: 'asdasd',
    user: {
      ...objectInitialValue
    }
  }

  beforeEach(() => {
    sut = new IsObjectValidator()
    sut.setField(field)
    objectInitialValue.profile = JSON.parse(JSON.stringify(profileData))
    myObject = {
      someField: 'asdasd',
      user: {
        ...objectInitialValue
      }
    }
  })

  test('Should return error without custom message if field is not an object', () => {
    myObject.user = 'Hello' as any
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.OBJECT}`)
  })

  test('Should return error with custom message if field is not an object', () => {
    const customErrorMessage = 'Input field is not an object'
    sut = new IsObjectValidator(undefined, customErrorMessage, undefined)
    sut.setField(field)
    myObject.user = 'Hello' as any
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is an object', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should not perform validation if the validator is optional and the field is not present', () => {
    sut = new IsObjectValidator(undefined, undefined, true)
    sut.setField(field)
    myObject[field] = undefined as any
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is an object', () => {
    myObject.user = 'Hello' as any
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.OBJECT}`)

    myObject.user = JSON.parse(JSON.stringify(objectInitialValue))
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return ValidNestedFieldError with default message if schema properties are malformed', () => {
    myObject.user.profile.address = undefined as any
    sut = new IsObjectValidator(objectSchemaValidation)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new ValidNestedFieldError('Your input on field user is malformed.'))
    expect(error?.message).toBe('Your input on field user is malformed.')
  })

  test('Should return ValidNestedFieldError without custom message if object field value is invalid', () => {
    myObject.user.profile.phoneNumber = 'asd' as any
    sut = new IsObjectValidator(objectSchemaValidation)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(
        'phoneNumber',
        DATA_TYPES.NUMBER,
        'phoneNumber is not a number in profile'
      )
    )
    expect(error?.message).toBe('phoneNumber is not a number in profile')
  })

  test('Should return ValidNestedFieldError with custom message if object nested field value is invalid', () => {
    const customErrorMessage = 'Input field is not an object'
    myObject.user.profile.address.street = true as any
    sut = new IsObjectValidator(objectSchemaValidation, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new ValidNestedFieldError(customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return ValidNestedFieldError with custom message if object nested optional field value is invalid', () => {
    const customErrorMessage = 'Input field is not an object'
    myObject.user.profile.address = {
      ...myObject.user.profile.address,
      city: { location: 123 as any }
    }
    sut = new IsObjectValidator(objectSchemaValidation, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new ValidNestedFieldError(customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when all object fields are valid', () => {
    myObject.user.profile.address.street = true as any
    sut = new IsObjectValidator(objectSchemaValidation)
    sut.setField(field)
    let error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError('street', DATA_TYPES.STRING, 'street is not a string in address')
    )
    expect(error?.message).toBe('street is not a string in address')

    myObject.user.profile.address.street = '21st'
    sut = new IsObjectValidator(objectSchemaValidation)
    sut.setField(field)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()

    myObject.user.profile.address = {
      ...myObject.user.profile.address,
      city: { location: '123' }
    }
    sut = new IsObjectValidator(objectSchemaValidation)
    sut.setField(field)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
