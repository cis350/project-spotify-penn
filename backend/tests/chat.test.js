const request = require('supertest');
const webapp = require('../server');

describe('PUT /sockets/:socket', () => {
  it('should respond with a success message when updating messages', async () => {
    const socketId = 1; // Replace with a valid socket ID
    const updatedSocket = { messages: [] };
    const response = await request(webapp).put(`/sockets/${socketId}`).send(updatedSocket);
    expect(response.statusCode).toBe(200);
    // Add any other relevant properties you expect to be returned in the response body
  });

  it('should respond with an error message when trying to update messages for a non-existent socket', async () => {
    const socketId = 999; // Replace with an invalid socket ID
    const updatedSocket = { messages: [] };
    const response = await request(webapp).put(`/sockets/${socketId}`).send(updatedSocket);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toContain('unknown socket');
  });
});

describe('GET /sockets/:socket', () => {
  it('should respond with messages when fetching messages for an existing socket', async () => {
    const socketId = 1; // Replace with a valid socket ID
    const response = await request(webapp).get(`/sockets/${socketId}`);
    expect(response.statusCode).toBe(200);
    // Add any other relevant properties you expect to be returned in the response body
  });

  it('should respond with an error message when trying to fetch messages for a non-existent socket', async () => {
    const socketId = 999; // Replace with an invalid socket ID
    const response = await request(webapp).get(`/sockets/${socketId}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toContain('unknown socket');
  });
});

describe('GET /sockets', () => {
  it('should respond with a list of sockets', async () => {
    const response = await request(webapp).get('/sockets');
    expect(response.statusCode).toBe(200);
    // Add any other relevant properties you expect to be returned in the response body
  });
});

describe('POST /sockets', () => {
  it('should respond with a success message when creating a new conversation', async () => {
    const document = { /* your conversation document structure */ };
    const response = await request(webapp).post('/sockets').send(document);
    expect(response.statusCode).toBe(201);
    // Add any other relevant properties you expect to be returned in the response body
  });
});
