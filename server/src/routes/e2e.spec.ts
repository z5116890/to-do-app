import request from 'supertest'
import app from '../app'

describe('testing GET /', () => {
  it('should respond back with 200 status code', async () => {
    // should save item into db
    // should respond with status 200
    const response = request(app).get('/')
    expect((await response).status).toBe(200)

  })
  it('should specify json in the content type header', async () => {
    // should save item into db
    // should respond with status 200
    const response = request(app).get('/')
    expect((await response).header['content-type']).toEqual(expect.stringContaining("json"))

  })
  it('response.data should have more than 0 items', async () => {

    const response = request(app).get('/')
    expect((await response).body.length).toBeGreaterThan(0);

  })

})

describe('testing POST /', () => {
  it('should respond back with 200 status code and should specify json in the content type header', async () => {
    // should save item into db
    // should respond with status 200
    const response = request(app).post('/').send({
      id: 100, 
      todo: 'working', 
      completed: true
    })
    expect((await response).status).toBe(200)
    expect((await response).header['content-type']).toEqual(expect.stringContaining("json"))


  })

  it('should return 400 if todo or completed is empty', async () => {
    // should save item into db
    // should respond with status 200
    const response1 = request(app).post('/').send({
      id: 100, 
      todo: '', 
      completed: true
    })
    expect((await response1).status).toBe(400)
    const response2 = request(app).post('/').send({
      id: 100, 
      completed: true
    })
    expect((await response2).status).toBe(400)
    const response3 = request(app).post('/').send({
      id: 100, 
      todo: '', 
    })
    expect((await response3).status).toBe(400)
  })
})

describe('testing DELETE /', () => {
  it('should return 200 status and delete item from database given id', async () => {
    // get items
    const items: any = request(app).get('/')
    // get number of items
    const numItems = (await items).body.length
    console.log(numItems)
    // delete last item
    const deleteRes = request(app).delete('/').send({
        id: (await items).body[numItems - 1].id
    })
    expect((await deleteRes).status).toBe(200)
      
    const updatedItems = request(app).get('/')
    console.log((await updatedItems).body.length)
    expect((await updatedItems).body.length).toEqual(numItems - 1)
  })
  it('should return 400 when no id is given', async () => {
    const deleteRes = request(app).delete('/')
    expect((await deleteRes).status).toBe(400)
  })

})
describe('testing PATCH /', () => {
  it('should return 200 status when id given', async () => {
    const items: any = request(app).get('/')
    const numItems = (await items).body.length
    const res = request(app).patch('/').send({
      id: (await items).body[numItems - 1].id
    })
    expect((await res).status).toBe(200)
    
      
  })
  it('should return 400 status when no id given', async () => {
    const items: any = request(app).get('/')
    const numItems = (await items).body.length
    const res = request(app).patch('/')
    expect((await res).status).toBe(400)
    
      
  })

})