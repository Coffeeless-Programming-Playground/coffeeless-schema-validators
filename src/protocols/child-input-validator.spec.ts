import { ChildInputValidator } from '.'

describe('ChildInputValidator tests', () => {
  test('Should return optional true when class is instantiated with optional true', () => {
    class ChildInputValidatorSubClass extends ChildInputValidator {
      validate(input: any): Error | undefined {
        throw new Error('Method not implemented.')
      }
    }
    const subclassInstance = new ChildInputValidatorSubClass(true)
    expect(subclassInstance.isOptional()).toBe(true)
  })

  test('Should return optional false when class is instantiated with optional false', () => {
    class ChildInputValidatorSubClass extends ChildInputValidator {
      validate(input: any): Error | undefined {
        throw new Error('Method not implemented.')
      }
    }
    const subclassInstance = new ChildInputValidatorSubClass(false)
    expect(subclassInstance.isOptional()).toBe(false)
  })

  test('Should return optional false when class is instantiated without constructor argument', () => {
    class ChildInputValidatorSubClass extends ChildInputValidator {
      validate(input: any): Error | undefined {
        throw new Error('Method not implemented.')
      }
    }
    const subclassInstance = new ChildInputValidatorSubClass()
    expect(subclassInstance.isOptional()).toBe(false)
  })

  test('Should return set field when getField is called', () => {
    class ChildInputValidatorSubClass extends ChildInputValidator {
      validate(input: any): Error | undefined {
        throw new Error('Method not implemented.')
      }
    }
    const subclassInstance = new ChildInputValidatorSubClass()
    subclassInstance.setField('hello')
    expect(subclassInstance.getField()).toBe('hello')
    subclassInstance.setField('bye')
    expect(subclassInstance.getField()).toBe('bye')
  })
})
