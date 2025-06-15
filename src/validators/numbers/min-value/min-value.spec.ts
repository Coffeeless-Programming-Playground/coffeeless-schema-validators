import { MinValueFieldError } from '@errors/min-value-field-error'
import faker from '@faker-js/faker'
import { MinNumberValueValidator } from '.'

const objectInitialValue = {
  cats: 3,
  anotherField: faker.random.word()
}

describe('MinNumberValueValidator', () => {
  let sut: MinNumberValueValidator
  const field = 'cats'
  const minValue = 4
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new MinNumberValueValidator(minValue)
    sut.setField(field)
    objectInitialValue.cats = 3
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if number is less than min value', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, minValue))
    expect(error?.message).toBe(`${field} value must be at least ${minValue}`)
  })

  test('Should return error with custom message if number is less than min value', () => {
    const customErrorMessage = 'The field value is less than min value.'
    sut = new MinNumberValueValidator(minValue, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, minValue, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field value is greater than min value', () => {
    myObject.cats = minValue + 1
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field value is equal to min value', () => {
    myObject.cats = minValue
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field value is equal to min value', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, minValue))
    expect(error?.message).toBe(`${field} value must be at least ${minValue}`)

    myObject.cats = minValue
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
