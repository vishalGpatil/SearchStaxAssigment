const fs = require('fs');
const path = require('path');

class ApiPage {
  constructor(request, token) {
    this.request = request;
    this.token = token;
  }

  async downloadFile(url, filePath) {
    const response = await this.request.get(url);
    if (response.status() === 200) {
      const buffer = await response.body();
      fs.writeFileSync(filePath, buffer);
      return filePath;
    }
    throw new Error('File download failed');
  }

  async uploadFile(filePath, uploadUrl) {
    const fileStream = fs.createReadStream(filePath);
    const response = await this.request.post(uploadUrl, {
      multipart: { file: fileStream },
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return response.ok();
  }

  async getAuthToken(authUrl, apiKey) {
    const response = await this.request.post(authUrl, {
      data: { 'Secret': apiKey }
    });
    const body = await response.json();
    return body.token || apiKey;
  }
}

module.exports = ApiPage;
