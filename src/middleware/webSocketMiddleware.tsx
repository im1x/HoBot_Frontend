import { Middleware } from 'redux'
import {io, Socket} from 'socket.io-client';
import { webSocketActions, WsMessage } from '../store/reducers/WebSocketSlice.ts';
import {SongRequestVideo, songRequestActions} from "../store/reducers/SongRequestSlice.ts";

export enum WsEvent {
  Subscribe = 'subscribe',
  SendMessage = 'send_message',
  RequestAllMessages = 'request_all_messages',
  SendAllMessages = 'send_all_messages',
  ReceiveMessage = 'receive_message',
  TestEmit ='testEmit',
  SongRequestAdded = 'SongRequestAdded'
}

const webSocketMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished = socket/* && store.getState().chat.isConnected*/;

    if (webSocketActions.startConnecting.match(action)) {
      if (!socket) {
        socket = io(import.meta.env.VITE_WS_URL, {
          withCredentials: true,
          auth: {
            token: localStorage.getItem("token")
          }
        });
      }

      socket.on('connect', () => {
        store.dispatch(webSocketActions.connectionEstablished());
        //socket.emit(WsEvent.Subscribe, {token: localStorage.getItem("token")});
      })

      socket.on("connect_error", (err) => {
        console.log(err);
      });

      socket.on(WsEvent.SendAllMessages, (messages: WsMessage[]) => {
        store.dispatch(webSocketActions.receiveAllMessages({ messages }));
      })

      socket.on(WsEvent.ReceiveMessage, (message: WsMessage) => {
        store.dispatch(webSocketActions.receiveMessage({ message }));
      })

      // song requests
      socket.on(WsEvent.SongRequestAdded, (message: SongRequestVideo) => {
        console.log("---------1---------");
        console.log(message);
        store.dispatch(songRequestActions.addVideo(message));
      })
    }

    if (webSocketActions.submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(WsEvent.SendMessage, action.payload.content);
    }

    if (webSocketActions.emit.match(action) && isConnectionEstablished) {
      socket.emit(action.payload.type, action.payload.content);
    }



    next(action);
  }
}

export default webSocketMiddleware;
