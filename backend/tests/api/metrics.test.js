const request = require('supertest')
const app = require('../../server')

// Happy case - unit test - (use case getTime)
describe('Get time', () => {
  it('Should get 200 status code in the response', async () => {
    const res = await request(app)
      .get('/metrics')
      .set({ Authorization: 'mysecrettoken' })
      .send()
    expect(res.statusCode).toEqual(200)
  })
})

// Not happy case - unit test - (use case getTime)
describe('Get time', () => {
    it('Should get 403 status code in the response', async () => {
      const res = await request(app)
        .get('/metrics')
        .set({ Authorization: 'mysecrettoken2' })
        .send()
      expect(res.statusCode).toEqual(403)
    })
  })
