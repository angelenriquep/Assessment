const request = require('supertest')
const app = require('../../server')

// Happy case - unit test - (use case getTime)
describe('Get time', () => {
  it('Should get 200 status code in the response', async () => {
    const res = await request(app)
      .get('/time')
      .set({ Authorization: 'mysecrettoken' })
      .send()
    expect(res.statusCode).toEqual(200)
  })
})

// No happy case - unit test - (use case getTime)
describe('Get time with no valid token', () => {
    it('Response should be 403 as specified in requirements', async () => {
      const res = await request(app)
        .get('/time')
        .set({ Authorization: 'mysecrettoken2' })
        .send()
      expect(res.statusCode).toEqual(403)
    })
  })

  // No happy case - unit test - (use case getTime)
describe('Get time with no header', () => {
    it('Response should be 403 as specified in requirements', async () => {
      const res = await request(app)
        .get('/time')
        .send()
      expect(res.statusCode).toEqual(403)
    })
  })