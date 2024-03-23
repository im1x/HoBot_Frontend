import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {AuthResponse} from "../models/response/AuthResponse.ts";
import {store} from "../store/store.ts";
import {clearAuth, setAuth} from "../store/reducers/UserSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { /*getState,*/ endpoint }) => {
    if (endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }
    return headers;
  },
  credentials: "include", // This allows server to set cookies
});
export const BaseQueryWithReAuth: BaseQueryFn<
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
      store.dispatch(setAuth(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      store.dispatch(clearAuth())
    }
  }
  return result
}
