import socketIO from 'socket.io';

/**
 * Contains method for initializing socket.io
 *
 * @class SocketIO
 */
class SocketIO {
  /**
   * Setup condition appropriate to start realtime notification.
   * @param {Server} server - The express application.
   * @returns {null} null.
   * @memberof SocketIO
   */
  static async initialize(server) {
    const io = socketIO(server);
    global.activeSockets = [];
    io.sockets.on('connection', (socket) => {
      if (socket.handshake.query.socketId) {
        const { socketId } = socket.handshake.query;
        global.activeSockets[socketId] = socket;
        socket.emit('connected', 'Socket.io registered!, you\'ll now recieve real-time updates while you remain online');
        socket.on('disconnect', () => {
          global.activeSockets[socketId] = null;
        });
      }
    });
  }
}

export default SocketIO;
