import request from 'supertest'
import app from './config/app'

describe('Express user save example', () => {
  const now = Math.floor(Date.now() / 1000) // Current time in seconds
  const oneHourAhead = now + 3600 // Current time plus 1 second

  describe('Standard schema validator tests', () => {
    test('Should return 400 if name is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: '',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: RequiredFieldError: name is Required"}')
    })

    test('Should return 400 if name is less than 2 characters', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'a',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthFieldError: name must be 2 characters at least"}'
        )
    })

    test('Should return 400 if name is greater than 20 characters', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'asdasdasdasdasdaasdas',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MaxLengthFieldError: name must be 20 characters at most"}'
        )
    })

    test('Should return 400 if lastName is less than 10 characters', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chinta',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthFieldError: lastName must be 10 characters at least"}'
        )
    })

    test('Should return 400 if lastName is less than 20 characters', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Fréd',
          lastName: 'Chintalapani Chopin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthFieldError: lastName must be 20 characters at least"}'
        )
    })

    test('Should return 400 if email is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: '',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: RequiredFieldError: email is Required,' +
            'EmailFieldError: email is not valid"}'
        )
    })

    test('Should return 400 if email is invalid', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopingmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107483392',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: EmailFieldError: email is not valid"}')
    })

    test('Should return 400 if phoneNumber is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: RequiredFieldError: phoneNumber is Required"}'
        )
    })

    test('Should return 400 if phoneNumber is invalid', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '61074833920as',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: InvalidFieldError: phoneNumber is invalid"}')
    })

    test('Should return 400 if timestamp has expired', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: now - 3600,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: TimestampExpirationError: timestamp has expired"}'
        )
    })

    test('Should return 400 if pets array length is less than 2', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthArrayError: pets must contain at least 2 element(s)"}'
        )
    })

    test('Should return 400 if any element length in pets array is less than 3', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'an'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthFieldError: Array element must be 3 characters at least"}'
        )
    })

    test('Should return 400 if any element in pets array does not match regex pattern', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'baby dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: InvalidFieldError: Array element is invalid"}'
        )
    })

    test('Should return 400 if age is negative', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: -17,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: IsPositiveFieldError: age is not positive,MinValueFieldError: age value must be at least 18"}'
        )
    })

    test('Should return 400 if age is less than min value', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 17,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinValueFieldError: age value must be at least 18"}'
        )
    })

    test('Should return 400 if info object is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {},
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: InvalidFieldTypeError: info is not an object"}'
        )
    })

    test('Should return 400 if passwords do not match', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword2',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: NotEqualFieldError: confirmPassword is not equal to password"}'
        )
    })

    test('Should return 400 if isAlive is not a boolean', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: 1,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: InvalidFieldTypeError: isAlive is not a boolean"}'
        )
    })

    test('Should return 400 if isBroke is true', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: true,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: IsFalseFieldError: isBroke is not false"}')
    })

    test('Should return 400 if isAMillionaire is false', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: true,
          isAMillionaire: false,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: IsFalseFieldError: isBroke is not false"}')
    })

    test('Should return 400 if currentBalance is positive', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: 100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: IsNegativeFieldError: currentBalance is not negative"}'
        )
    })

    test('Should return 400 if surname is present in the schema', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          surname: 'Alex',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: ForbiddenFieldError: surname is not a valid field"}'
        )
    })

    test('Should return 400 if optional ip is not valid', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          ip: 'not_valid',
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(400, '{"error":"Bad request exception: InvalidFieldError: ip is invalid"}')
    })

    test('Should return 400 if dogArray contains invalid key names', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weightt: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: ObjectKeyValueMatchesError: weightt in dogArray is not valid"}'
        )
    })

    test('Should return 400 if dogArray contains invalid key values', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: 100,
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: InvalidFieldTypeError: weight is not a string"}'
        )
    })

    test('Should return 400 if excludeRecipients input is malformed', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine']
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: ValidNestedFieldError: Your input on field excludeRecipients is malformed."}'
        )
    })

    test('Should return 400 if excludeRecipients contains invalid values', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'tonny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabrielas'
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: ValidNestedFieldError: user in excludeRecipients field is not valid"}'
        )
    })

    test('Should return 400 if nested boy field has invalid name', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela',
              boy: {
                name: 1,
                lastName: 'Albert'
              }
            }
          }
        })
        .expect(
          400,
          '{"error":"Bad request exception: ValidNestedFieldError: boy in nested field is not valid"}'
        )
    })

    test('Should return 200 if schema is valid', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          ip: '127.0.0.1',
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela',
              boy: {
                name: 'Alberto',
                lastName: 'Albert'
              }
            }
          }
        })
        .expect(200, '{"message":"Saved user!"}')
    })
  })

  describe('Fail fast schema validator tests', () => {
    test('Should throw RequiredFieldError on name field', async () => {
      await request(app)
        .post('/v2/create')
        .send({
          timestamp: oneHourAhead,
          name: '',
          lastName: 'Chintalapani Chopinin',
          email: 'chopingmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '61074833920as',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100
        })
        .expect(400, '{"error":"Bad request exception: name is Required"}')
    })

    test('Should throw TimestampExpirationError on exp field', async () => {
      await request(app)
        .post('/v2/create')
        .send({
          timestamp: now - 3600,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100
        })
        .expect(400, '{"error":"Token has expired"}')
    })

    test('Should return 200 if schema is valid', async () => {
      await request(app)
        .post('/v2/create')
        .send({
          timestamp: oneHourAhead,
          name: 'Frédéric Chopin',
          lastName: 'Chintalapani Chopinin',
          email: 'chopin@gmail.com',
          pets: ['cat', 'dog'],
          age: 18,
          info: {
            address: 'home',
            zipCode: 12345
          },
          password: 'mypassword',
          confirmPassword: 'mypassword',
          phoneNumber: '6107482298',
          isAlive: true,
          isBroke: false,
          isAMillionaire: true,
          currentBalance: -100,
          dogArray: {
            weight: '100',
            height: '100'
          },
          dogRegex: {
            weight: '100',
            height: '100'
          },
          excludeRecipients: {
            user: ['diego', 'ronny'],
            application: ['blog-services', 'medicine'],
            nested: {
              girl: 'gabriela'
            }
          }
        })
        .expect(200, '{"message":"Saved user!"}')
    })
  })
})
