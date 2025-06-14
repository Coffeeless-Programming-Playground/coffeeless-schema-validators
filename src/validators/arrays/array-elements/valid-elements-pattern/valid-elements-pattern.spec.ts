import { InvalidFieldError } from '@errors/invalid-field-error'
import faker from '@faker-js/faker'
import { ArrayElementsMatchPatternValidator } from '.'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { DATA_TYPES } from '@constants/data-types'

const objectInitialValue = {
  uuids: ['3582e85c-9aaf-446a-ba60-d2d6caf8ab4f', '2582e85c-9aaf-446a-ba60-d2d6caf8ab4c'] as any,
  anotherField: faker.random.word()
}

describe('ArrayElementsMatchPatternValidator', () => {
  let sut: ArrayElementsMatchPatternValidator
  const field = 'uuids'
  let myObject = objectInitialValue
  /**
   * UUID regex pattern.
   */
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  beforeEach(() => {
    sut = new ArrayElementsMatchPatternValidator(pattern)
    sut.setField(field)
    objectInitialValue.uuids = [
      '3582e85c-9aaf-446a-ba60-d2d6caf8ab4f',
      '2582e85c-9aaf-446a-ba60-d2d6caf8ab4c'
    ] as any
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if an array element is not a string', () => {
    myObject.uuids = ['3582e85c-9aaf-446a-ba60-d2d6caf8ab4f', 1]
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError('Array element', `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe(`Array element is not a ${DATA_TYPES.STRING}`)
  })

  test('Should return error without custom message if an array element does not match regex pattern', () => {
    myObject.uuids = ['invalid string', '1282e85c-9aaf-44c6a-ba60-d2d6caf8ab4']
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError('Array element'))
    expect(error?.message).toBe('Array element is invalid')
  })

  test('Should return error with custom message if an array element does not match regex pattern', () => {
    myObject.uuids = ['invalid string', '1282e85c-9aaf-44c6a-ba60-d2d6caf8ab4']
    const message = 'An array element does not match the regex pattern'
    sut = new ArrayElementsMatchPatternValidator(pattern, message)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError('Array element', message))
    expect(error?.message).toBe(message)
  })

  test('Should return falsy is all array elements match regex pattern', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if all array elements match regex pattern', () => {
    myObject.uuids = ['3582e85c-9aaf-446a-ba60-d2d6caf8ab4', 'invalid string']
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError('Array element'))
    expect(error?.message).toBe('Array element is invalid')

    myObject.uuids = [
      '3582e85c-9aaf-446a-ba60-d2d6caf8ab4f',
      '2582e85c-9aaf-446a-ba60-d2d6caf8ab4c'
    ]
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
