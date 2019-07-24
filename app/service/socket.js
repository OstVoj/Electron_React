import io from 'socket.io-client';

export default class Socket {
  constructor(url, type, token) {
    this.url = url;
    this.core = io.connect(this.url, { query: `type=${type}&token=${token}` });
  }
}
