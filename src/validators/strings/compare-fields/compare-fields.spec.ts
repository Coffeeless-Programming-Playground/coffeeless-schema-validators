import { DATA_TYPES } from '@constants/data-types'
import { NotEqualFieldError } from '@errors/not-equal-field-error'
import faker from '@faker-js/faker'
import { CompareStringFieldValidator } from '.'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'

const objectInitialValue = {
  confirmPassword: 'mypassword' as any,
  password: 'mypassword',
  anyField: faker.random.word()
}

describe('CompareStringFieldValidator', () => {
  let sut: CompareStringFieldValidator
  const field = 'password'
  const anotherField = 'confirmPassword'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new CompareStringFieldValidator(anotherField)
    sut.setField(field)
    objectInitialValue.confirmPassword = 'mypassword'
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if anotherField is not a string', () => {
    myObject.confirmPassword = {}
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(anotherField, `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe(`${anotherField} is not a ${DATA_TYPES.STRING}`)
  })

  test('Should return error without custom message if string field is not equal to other string field', () => {
    myObject.confirmPassword = 'mypassword2'
    const error = sut.validate(myObject)
    expect(error).toEqual(new NotEqualFieldError(field, anotherField))
    expect(error?.message).toBe(`${field} is not equal to ${anotherField}`)
  })

  test('Should return error with custom message if string field is not equal to other string field', () => {
    myObject.confirmPassword = 'mypassword2'
    const customErrorMessage = 'The string field is not equal to the other string field'
    sut = new CompareStringFieldValidator(anotherField, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new NotEqualFieldError(field, anotherField, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if string field is equal to other string field', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if string field is equal to other string field', () => {
    myObject.confirmPassword = 'mypassword2'
    let error = sut.validate(myObject)
    expect(error).toEqual(new NotEqualFieldError(field, anotherField))
    expect(error?.message).toBe(`${field} is not equal to ${anotherField}`)

    myObject.confirmPassword = 'mypassword'
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
