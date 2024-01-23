import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {SettingsCommand, SettingsCommandsList} from "../models/response/SettingsResponse.ts";

// Define a service using a base URL and expected endpoints
export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({

    getCommands: builder.query<SettingsCommand[], void>({
      query: () => ({
        url: "settings/commands",
      }),
    }),

    getCommandsDropdown: builder.query<SettingsCommandsList[], void>({
      query: () => ({
        url: "settings/commandsdropdown",
      }),
    }),

    addCommand: builder.mutation<SettingsCommand[], SettingsCommand>({
      query: (cmd) => ({
        url: "/settings/commands",
        method: "POST",
        body: cmd,
      }),
    }),

    editCommand: builder.mutation<SettingsCommand[], {alias: string, cmd: SettingsCommand}>({
      query: ({alias, cmd}) => ({
        url: `/settings/commands/${alias}`,
        method: "PUT",
        body: cmd,
      }),
    }),

    deleteCommand: builder.mutation<SettingsCommand[], string>({
      query: (alias) => ({
        url: `/settings/commands/${alias}`,
        method: "DELETE",
      }),
    }),

  }),
});
