import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsBooleanValidator } from '.'

const objectInitialValue = {
  isPresent: true,
  anotherField: faker.random.word()
}

describe('IsBooleanValidator', () => {
  let sut: IsBooleanValidator
  const field = 'isPresent'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsBooleanValidator()
    sut.setField(field)
    objectInitialValue.isPresent = true
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not a boolean', () => {
    myObject.isPresent = 'Hello' as any
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.BOOLEAN}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.BOOLEAN}`)
  })

  test('Should return error with custom message if field is not a boolean', () => {
    const customErrorMessage = 'Input field is not a boolean'
    sut = new IsBooleanValidator(customErrorMessage)
    sut.setField(field)
    myObject.isPresent = 'Hello' as any
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `a ${DATA_TYPES.BOOLEAN}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is a boolean', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is a boolean', () => {
    myObject.isPresent = 'Hello' as any
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.BOOLEAN}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.BOOLEAN}`)

    myObject.isPresent = true
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
