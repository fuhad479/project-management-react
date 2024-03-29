import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedOut } from '../auth/authSlice'

/* const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;

        if (token) {
            headers.set(`Authorization`, `Bearer ${token}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }

        return result;
    },
    endpoints: (builder) => ({}),
}); */

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_DEV_SERVER
                : process.env.REACT_APP_PROD_SERVER
    }),
    tagTypes: ["Team"],
    endpoints: () => ({})
})
