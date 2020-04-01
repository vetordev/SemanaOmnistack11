const request = require('supertest')
const app = require('../../source/app')
const connection = require('../../source/database/connection')

describe('ONG', () => {
   beforeEach(async () => {
      await connection.migrate.rollback()
      await connection.migrate.latest()
   })

   afterAll(async () => {
      await connection.destroy()
   })

   it('should be able to create a new ONG', async () => {
      const response = await request(app)
         .post('/ongs')
         .send({
            name: "APAD",
            email: "contato@apad.com.br",
            whatsapp: "11952316039",
            city: "São Paulo",
            uf: "SP"
         })
   
      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)
   })
})