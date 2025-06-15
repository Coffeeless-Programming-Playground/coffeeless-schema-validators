import faker from '@faker-js/faker'
import { mock, MockProxy } from 'jest-mock-extended'
import {
  EmailFieldError,
  InvalidFieldError,
  MinLengthFieldError,
  RequiredFieldError
} from '@errors/index'
import {
  CompositeValidator,
  EmailInputValidator,
  MinLengthInputValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator,
  StringValidatorBuilder
} from '@validators/index'

interface User {
  name: string
  lasName: string
  phoneNumber: string
  email: string
}

const initialUserData: User = {
  name: 'Diego',
  lasName: 'Salas',
  phoneNumber: '(415) 555-2671',
  email: 'dominicsc2hs@gmail.com'
}

describe('CompositeValidator', () => {
  const anyField = faker.random.word()
  const anyValue = faker.random.word()
  let sut: CompositeValidator<User>
  let stringValidatorBuilder: MockProxy<StringValidatorBuilder>
  let emailInputValidator: MockProxy<EmailInputValidator>
  let minLengthInputValidator: MockProxy<MinLengthInputValidator>
  let requiredFieldInputValidator: MockProxy<RequiredFieldInputValidator>
  let validFieldInputValidator: MockProxy<ValidFieldInputValidator>
  let myUser: User

  beforeAll(() => {
    stringValidatorBuilder = mock()
    emailInputValidator = mock()
    minLengthInputValidator = mock()
    requiredFieldInputValidator = mock()
    validFieldInputValidator = mock()
    emailInputValidator.validate.mockReturnValue(undefined)
    minLengthInputValidator.validate.mockReturnValue(undefined)
    requiredFieldInputValidator.validate.mockReturnValue(undefined)
    validFieldInputValidator.validate.mockReturnValue(undefined)
    stringValidatorBuilder.email.mockReturnValue(stringValidatorBuilder)
    stringValidatorBuilder.min.mockReturnValue(stringValidatorBuilder)
    stringValidatorBuilder.required.mockReturnValue(stringValidatorBuilder)
    stringValidatorBuilder.valid.mockReturnValue(stringValidatorBuilder)
    stringValidatorBuilder.build
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([emailInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([validFieldInputValidator, requiredFieldInputValidator])
    sut = new CompositeValidator({
      name: stringValidatorBuilder.min(2).required().build(),
      lasName: stringValidatorBuilder.min(5).required().build(),
      email: stringValidatorBuilder.email().required().build(),
      phoneNumber: stringValidatorBuilder
        .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
        .required()
        .build()
    })
    myUser = { ...initialUserData }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return an empty list of errors', () => {
    const errors = sut.validate(myUser)
    expect(errors).toEqual([])
    expect(emailInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(minLengthInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(requiredFieldInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(validFieldInputValidator.validate).toHaveBeenCalledWith(myUser)
  })

  test('Should return a populated list of errors if any of the dependencies returns an exception', () => {
    emailInputValidator.validate.mockReturnValueOnce(new EmailFieldError(anyField))
    minLengthInputValidator.validate.mockReturnValueOnce(new MinLengthFieldError(anyField, 5))
    requiredFieldInputValidator.validate.mockReturnValueOnce(new RequiredFieldError(anyField))
    validFieldInputValidator.validate.mockReturnValueOnce(new InvalidFieldError(anyField))
    stringValidatorBuilder.build
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([emailInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([validFieldInputValidator, requiredFieldInputValidator])
    sut = new CompositeValidator({
      name: stringValidatorBuilder.min(2).required().build(),
      lasName: stringValidatorBuilder.min(5).required().build(),
      email: stringValidatorBuilder.email().required().build(),
      phoneNumber: stringValidatorBuilder
        .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
        .required()
        .build()
    })
    const errors = sut.validate(myUser)
    expect(errors).toEqual([
      new MinLengthFieldError(anyField, 5),
      new RequiredFieldError(anyField),
      new EmailFieldError(anyField),
      new InvalidFieldError(anyField)
    ])
    expect(emailInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(minLengthInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(requiredFieldInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(validFieldInputValidator.validate).toHaveBeenCalledWith(myUser)
  })

  test('Should throw the first exception returned if any of the dependencies returns an exception', () => {
    const requiredException = new RequiredFieldError(anyField)
    requiredFieldInputValidator.validate.mockReturnValueOnce(requiredException)
    stringValidatorBuilder.build
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([minLengthInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([emailInputValidator, requiredFieldInputValidator])
      .mockReturnValueOnce([validFieldInputValidator, requiredFieldInputValidator])
    sut = new CompositeValidator({
      name: stringValidatorBuilder.min(2).required().build(),
      lasName: stringValidatorBuilder.min(5).required().build(),
      email: stringValidatorBuilder.email().required().build(),
      phoneNumber: stringValidatorBuilder
        .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
        .required()
        .build()
    }).failFast()
    expect(() => sut.validate(myUser)).toThrow(requiredException)
    expect(minLengthInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(requiredFieldInputValidator.validate).toHaveBeenCalledWith(myUser)
    expect(emailInputValidator.validate).not.toHaveBeenCalledWith(myUser)
    expect(validFieldInputValidator.validate).not.toHaveBeenCalledWith(myUser)
  })
})
