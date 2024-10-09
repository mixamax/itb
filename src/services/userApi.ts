import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser, UserSchema } from "../models/user";
import { baseUrl } from "../constants";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getUser: builder.query<TUser[], void>({
            query: () => `/users`,
            providesTags: ["Users"],
            transformResponse: (response: unknown) =>
                UserSchema.array().parse(response),
        }),
        updateUser: builder.mutation<TUser, TUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: ["Users"],
            transformResponse: (response: unknown) =>
                UserSchema.parse(response),
        }),
    }),
});
