import request from 'supertest'
import app from './config/app'

describe('Express user save example', () => {
  describe('Standard schema validator tests', () => {
    test('Should return 400 if name is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          name: '',
          email: 'chopin@gmail.com',
          phoneNumber: '6107483392'
        })
        .expect(400, '{"error":"Bad request exception: RequiredFieldError: name is Required"}')
    })

    test('Should return 400 if name is lest than 2 characters', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          name: 'a',
          email: 'chopin@gmail.com',
          phoneNumber: '6107483392'
        })
        .expect(
          400,
          '{"error":"Bad request exception: MinLengthFieldError: name must be 2 characters at least"}'
        )
    })

    test('Should return 400 if email is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          name: 'Frédéric Chopin',
          email: '',
          phoneNumber: '6107483392'
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
          name: 'Frédéric Chopin',
          email: 'chopingmail.com',
          phoneNumber: '6107483392'
        })
        .expect(400, '{"error":"Bad request exception: EmailFieldError: email is not valid"}')
    })

    test('Should return 400 if phoneNumber is empty', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          name: 'Frédéric Chopin',
          email: 'chopin@gmail.com',
          phoneNumber: ''
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
          name: 'Frédéric Chopin',
          email: 'chopin@gmail.com',
          phoneNumber: '61074833920as'
        })
        .expect(400, '{"error":"Bad request exception: InvalidFieldError: phoneNumber is invalid"}')
    })

    test('Should return 200 if schema is valid', async () => {
      await request(app)
        .post('/v1/create')
        .send({
          name: 'Frédéric Chopin',
          email: 'chopin@gmail.com',
          phoneNumber: '6107482298'
        })
        .expect(200, '{"message":"Saved user!"}')
    })
  })

  describe('Fail fast schema validator tests', () => {
    test('Should throw RequiredFieldError on name field', async () => {
      await request(app)
        .post('/v2/create')
        .send({
          name: '',
          email: 'chopingmail.com',
          phoneNumber: '61074833920as'
        })
        .expect(400, '{"error":"Bad request exception: name is Required"}')
    })

    test('Should return 200 if schema is valid', async () => {
      await request(app)
        .post('/v2/create')
        .send({
          name: 'Frédéric Chopin',
          email: 'chopin@gmail.com',
          phoneNumber: '6107482298'
        })
        .expect(200, '{"message":"Saved user!"}')
    })
  })
})
