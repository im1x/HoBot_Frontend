import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import { IRegistration } from "../models/Registration.ts";
import { AuthResponse } from "../models/response/AuthResponse.ts";
import {store} from "../store/store.ts";
import {clearAuth, setUserAndAuth} from "../store/reducers/UserSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { /*getState,*/ endpoint }) => {
    //const user = (getState() as RootState).user.currentUser

    //if (user && endpoint !== 'refresh') {
    if (endpoint !== "refreshToken") {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }
    return headers;
  },
  credentials: "include", // This allows server to set cookies
});
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = (await baseQuery('/refresh', api, extraOptions)) as { data: AuthResponse };
    if (refreshResult.data) {
      // store the new token
      //api.dispatch(tokenReceived(refreshResult.data))
      store.dispatch(setUserAndAuth(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      //api.dispatch(loggedOut())
      store.dispatch(clearAuth())
    }
  }
  return result
}
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReAuth,
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

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getTestData: builder.query<string, void>({
      query: () => ({
        url: "/users",
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});
