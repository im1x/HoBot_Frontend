import { Middleware } from 'redux'
import {io, Socket} from 'socket.io-client';
import { webSocketActions, WsMessage } from '../store/reducers/WebSocketSlice.ts';

enum WsEvent {
  Subscribe = 'subscribe',
  SendMessage = 'send_message',
  RequestAllMessages = 'request_all_messages',
  SendAllMessages = 'send_all_messages',
  ReceiveMessage = 'receive_message'
}

const webSocketMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished = socket/* && store.getState().chat.isConnected*/;

    if (webSocketActions.startConnecting.match(action)) {
      if (!socket) {
        socket = io(import.meta.env.VITE_WS_URL, {
          withCredentials: true,
        });
      }
/*      socket = io(import.meta.env.VITE_WS_URL, {
        withCredentials: true,
      });*/

      socket.on('connect', () => {
        store.dispatch(webSocketActions.connectionEstablished());
        socket.emit(WsEvent.Subscribe, {token: localStorage.getItem("token")});
      })

      socket.on(WsEvent.SendAllMessages, (messages: WsMessage[]) => {
        store.dispatch(webSocketActions.receiveAllMessages({ messages }));
      })

      socket.on(WsEvent.ReceiveMessage, (message: WsMessage) => {
        store.dispatch(webSocketActions.receiveMessage({ message }));
      })
    }

    if (webSocketActions.submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(WsEvent.SendMessage, action.payload.content);
    }

    next(action);
  }
}

export default webSocketMiddleware;
