import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {SettingsCommand, SettingsCommandsList} from "../models/response/SettingsResponse.ts";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: BaseQueryWithReAuth,
  tagTypes: ["commands"],
  endpoints: (builder) => ({

    getCommands: builder.query<SettingsCommand[], void>({
      query: () => ({
        url: "settings/commands",
      }),
      providesTags: ["commands"],
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
      invalidatesTags: ["commands"],
    }),

    editCommand: builder.mutation<SettingsCommand[], {alias: string, cmd: SettingsCommand}>({
      query: ({alias, cmd}) => ({
        url: `/settings/commands/${alias}`,
        method: "PUT",
        body: cmd,
      }),
      invalidatesTags: ["commands"],
    }),

    deleteCommand: builder.mutation<SettingsCommand[], string>({
      query: (alias) => ({
        url: `/settings/commands/${alias}`,
        method: "DELETE",
      }),
      invalidatesTags: ["commands"],
    }),

    saveVolume: builder.mutation<null, number>({
      query: (volume) => ({
        url: `/settings/volume/${volume}`,
        method: "POST",
      }),
    }),

    getVolume: builder.query<number, void>({
      query: () => ({
        url: "settings/volume",
      }),
    }),

  }),
});
