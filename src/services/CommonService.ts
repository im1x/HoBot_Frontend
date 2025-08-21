import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "@services/BaseQueryWithReAuth";

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
