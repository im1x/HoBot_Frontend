import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {User} from "../models/User.ts";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({

    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/user",
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
