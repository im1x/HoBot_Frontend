import {createApi} from "@reduxjs/toolkit/query/react";
import { IRegistration } from "../models/Registration.ts";
import { AuthResponse } from "../models/response/AuthResponse.ts";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({
    /*    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),*/

    register: builder.mutation<AuthResponse, IRegistration>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      /*      transformResponse: (response: AuthResponse) => {
        console.info(response.User.login);
        console.info(JSON.stringify(response, null, 4));

        return response;
      },*/
    }),

    login: builder.mutation<AuthResponse, IRegistration>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),

    refreshToken: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/refresh",
      }),
    }),

    logout: builder.mutation<void, void> ({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

  }),
});
