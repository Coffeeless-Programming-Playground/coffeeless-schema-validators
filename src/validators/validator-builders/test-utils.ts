/* eslint-disable @typescript-eslint/prefer-function-type */
/* eslint-disable new-cap */
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/generic'

export function commonValidatorBuilderTests(
  validatorBuilderName: string,
  initMessage: string,
  baseValidatorBuilder: any,
  baseValidator: { new (...args: any[]): any }
) {
  test(`Should return ${validatorBuilderName} a when init is called`, () => {
    const validations = baseValidatorBuilder.init(initMessage).build()
    expect(validations).toEqual([new baseValidator(initMessage)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = baseValidatorBuilder.init().required().build()
    expect(validations).toEqual([new baseValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = baseValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new baseValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = baseValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new baseValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = baseValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new baseValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })
}
