import { Middleware } from 'redux'
import {io, Socket} from 'socket.io-client';
import { webSocketActions, WsMessage } from '../store/reducers/WebSocketSlice.ts';
import {songRequestActions} from "../store/reducers/SongRequestSlice.ts";
import {SongRequestVideo} from "../models/SongRequest.ts";
import {authApi} from "../services/AuthService.ts";
import {AppDispatch} from "../store/store.ts";

export enum WsEvent {
  SendMessage = 'send_message',
  SendAllMessages = 'send_all_messages',
  ReceiveMessage = 'receive_message',
  SongRequestAdded = 'SongRequestAdded',
  SongRequestSetVolume = 'SongRequestSetVolume',
  SongRequestSkipSong = 'SongRequestSkipSong',
  SongRequestPlayPause = 'SongRequestPlayPause',
  SongRequestDeleteSong = 'SongRequestDeleteSong'
}

const webSocketMiddleware: Middleware = store => {
  let socket: Socket;

  const reconnect = () => {
    console.log("--- WS connecting ---");
    socket = io(import.meta.env.VITE_WS_URL, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token")
      },
      reconnection: true,
      reconnectionDelay: 3000,
    });
  }

  return next => action => {
    const isConnectionEstablished = socket;

    if (webSocketActions.startConnecting.match(action)) {
      if (!socket) {
        reconnect();
      }

      socket.on('connect', () => {
        store.dispatch(webSocketActions.connectionEstablished());
        console.log("--- Connected to WebSocket ---");
      })

      socket.on("connect_error", (err) => {
        console.log("--- connect error ---");
        console.log(err.message);
        if (err.message === "Unauthorized: invalid token") {
          triggerApi(store.dispatch)
            .then((success) => {
              if (success) {
                reconnect();
              } else {
                console.error('Failed to refresh token');
              }
            });
        }
      });

      socket.on("disconnect", (reason) => {
        console.log(`--- Disconnected from WebSocket ---: ${reason}`);
      })

      socket.on(WsEvent.SendAllMessages, (messages: WsMessage[]) => {
        store.dispatch(webSocketActions.receiveAllMessages({ messages }));
      })

      socket.on(WsEvent.ReceiveMessage, (message: WsMessage) => {
        store.dispatch(webSocketActions.receiveMessage({ message }));
      })

      // song requests
      socket.on(WsEvent.SongRequestAdded, (video: SongRequestVideo) => {
        store.dispatch(songRequestActions.addVideo(video));
      })

      socket.on(WsEvent.SongRequestSetVolume, (volume: number) => {
        store.dispatch(songRequestActions.setVolume(volume));
      })

      socket.on(WsEvent.SongRequestSkipSong, () => {
        store.dispatch(songRequestActions.skipVideo());
      })

      socket.on(WsEvent.SongRequestDeleteSong, (id: string) => {
        store.dispatch(songRequestActions.deleteVideo(id));
      })

      socket.on(WsEvent.SongRequestPlayPause, () => {
        store.dispatch(songRequestActions.togglePlay());
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


const triggerApi = async (dispatch: AppDispatch): Promise<boolean> => {
  try {
    const promise = dispatch(authApi.endpoints.currentUser.initiate(undefined, { forceRefetch: true }));
    await promise;
    return true;
  } catch (error) {
    return false;
  }
}
export default webSocketMiddleware;
