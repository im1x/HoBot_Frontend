import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({

    sendFeedback: builder.mutation<null, string>({
      query: (text) => ({
        url: "feedback",
        method: "POST",
        body: text
      }),
    }),

  }),
});
