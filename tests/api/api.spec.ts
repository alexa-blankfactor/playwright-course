import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'
  test('Simple API test- Assest response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/3`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
  })

  test('Simple API test - Assest invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    expect(response.status()).toBe(404)
  })

  test('Get request - get user deatil', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()
  })

  test('POST Request - create new user ', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`,{
        data:{
            id:1000
        }
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(1000)
    expect(responseBody.createdAt).toBeTruthy()
  })

  test('POST Request login', async ({ request }) => {
     const response = await request.post(`${baseUrl}/login`,{
        data:{
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
     })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(200)
     expect(responseBody.token).toBeTruthy()
  })

  test('POST Request login fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`,{
        data:{
            email: "peter@klaven"
        }
     })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(400)
     expect(responseBody.error).toBe("Missing password")
  });
  
  test('PUT Request -update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`,{
        data:{
            name: "test10",
            job: "test"
        }
     })
     const responseBody = JSON.parse(await response.text())
     expect(response.status()).toBe(200)
     expect(responseBody.name).toBe("test10")
     expect(responseBody.job).toBe("test")
     expect(responseBody.updatedAt).toBeTruthy()
  });
  
  test('DELETE Request - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/1`)
    expect(response.status()).toBe(204)
  });
  
  
})
