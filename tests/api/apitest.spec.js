const { test, expect, request } = require('@playwright/test');
const ApiPage = require('../api/ApiPage');
const fs = require('fs');

const FILE_URL = 'https://file-examples.com/sample.pdf';
const LOCAL_FILE = './downloads/test.pdf';
const UPLOAD_URL = 'https://v2.convertapi.com/upload';
const AUTH_URL = 'https://v2.convertapi.com/auth'; 
const API_KEY = 'your-api-key-here'; 

test.describe('ConvertAPI File Tests', () => {
  let apiPage;
  let authToken;

  test.beforeAll(async ({ request }) => {
    apiPage = new ApiPage(request);
    authToken = await apiPage.getAuthToken(AUTH_URL, API_KEY);
    apiPage.token = authToken;
  });

  test('Download and write file', async () => {
    const filePath = await apiPage.downloadFile(FILE_URL, LOCAL_FILE);
    const fileContent = fs.readFileSync(filePath);
    expect(fileContent.length).toBeGreaterThan(0);
  });

  test('Upload file', async () => {
    const result = await apiPage.uploadFile(LOCAL_FILE, UPLOAD_URL);
    expect(result).toBeTruthy();
  });

  test('Authenticated endpoint access', async () => {
    const response = await request.get('https://v2.convertapi.com/user', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.status()).toBe(200);
  });
});
