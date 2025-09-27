import { MinValueFieldError } from '@errors/min-value-field-error'
import faker from '@faker-js/faker'
import { ConditionalValidatorProps } from '@protocols/conditional-validator-props'
import { ConditionalValidator } from '.'
import { number, string } from '../../utils'

const objectInitialValue = {
  age: 10,
  name: 'Diego',
  anotherField: faker.random.word()
}

describe('ConditionalValidator', () => {
  let sut: ConditionalValidator
  const field = 'age'
  const targetField = 'name'
  const conditionalValidator: ConditionalValidatorProps = {
    is: string().required().build(),
    then: number().min(12).build(),
    otherwise: number().min(11).build()
  }
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new ConditionalValidator(targetField, conditionalValidator)
    sut.setField(field)
    objectInitialValue.age = 10
    myObject = { ...objectInitialValue }
  })

  test('Should run then validation if name field is present', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, 12))
    expect(error?.message).toBe(`${field} value must be at least ${12}`)
  })

  test('Should run otherwise validation if name field is not present', () => {
    myObject.name = undefined as any
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, 11))
    expect(error?.message).toBe(`${field} value must be at least ${11}`)
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is meets conditional validation', () => {
    myObject.name = undefined as any
    let error = sut.validate(myObject)
    expect(error).toEqual(new MinValueFieldError(field, 11))
    expect(error?.message).toBe(`${field} value must be at least ${11}`)

    myObject.name = 'Diego'
    myObject.age = 12
    error = sut.validate(myObject)
    expect(error).toBeFalsy()

    myObject.name = undefined as any
    myObject.age = 11
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
