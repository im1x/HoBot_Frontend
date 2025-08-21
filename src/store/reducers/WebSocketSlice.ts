import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "@store/store";
import {WsEvent} from "@middleware/webSocketMiddleware";

export interface WsState {
  messages: WsMessage[],
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: WsState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false
};

export interface WsMessage {
  type: string;
  data: object | null;
  clientId: string;
}

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startConnecting: (state => {
      state.isEstablishingConnection = true;
    }),
    connectionEstablished: (state => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    }),
    receiveAllMessages: ((state, action: PayloadAction<{
      messages: WsMessage[]
    }>) => {
      state.messages = action.payload.messages;
    }),
    receiveMessage: ((state, action: PayloadAction<{
      message: WsMessage
    }>) => {
      state.messages.push(action.payload.message);
    }),
    submitMessage: ((state, action: PayloadAction<{
      content: string
    }>) => {
      console.log(state, action);
      return;
    }),
    emit: ((state, action: PayloadAction<{
      type: WsEvent,
      content: string
    }>) => {
      console.log(state, action);
      return;
    })
  },
});

export const webSocketActions = webSocketSlice.actions;
//export const selectUserState = (state: RootState) => state.user;
export const selectMessages = (state: RootState) => state.wsMessages.messages;
export default webSocketSlice;
