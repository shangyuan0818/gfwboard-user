import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import qs from "qs";
import type { AxiosError } from "axios";

// project imports
import instance from "@/middleware/api";
import { dispatch } from "@/store";
import { login } from "@/store/reducers/auth";

// models
import type ApiResponse from "@/model/api_response";
import type { LoginPayload, LoginResponse } from "@/model/login";
import type User from "@/model/user";
import type Subscription from "@/model/subscription";
import type Notice from "@/model/notice";
import type { UserConfig, GuestConfig } from "@/model/config";
import type { ResetPasswordPayload } from "@/model/reset_password";
import type { RegisterPayload } from "@/model/register";
import SendMailPayload from "@/model/send_mail";

const axiosBaseQuery: () => BaseQueryFn =
  () =>
  async ({ url, method, body, headers, params }) => {
    try {
      const response = await instance.request<ApiResponse>({
        url,
        method,
        data: body,
        headers,
        params
      });

      return { data: response.data.data };
    } catch (error) {
      const err: AxiosError<ApiResponse> = error as AxiosError<ApiResponse>;

      return {
        error: {
          status: err.response?.status || 500,
          message: err.response?.data?.message || err.message,
          errors: err.response?.data?.errors || null
        }
      };
    }
  };

const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Subscription", "Plan", "Notice"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: "/passport/auth/login",
        method: "POST",
        body: qs.stringify(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }),
      transformResponse: (response: LoginResponse) => {
        localStorage.setItem("gfw_token", response.auth_data);
        dispatch(
          login({
            isAdmin: response.is_admin
          })
        );
        return response;
      },
      invalidatesTags: ["User", "Subscription"]
    }),
    getUserInfo: builder.query<User, void>({
      query: () => ({
        url: "/user/info",
        method: "GET"
      }),
      providesTags: (result) => [
        { type: "User", id: result?.uuid },
        { type: "User", id: "LIST" }
      ]
    }),
    getUserSubscription: builder.query<Subscription, void>({
      query: () => ({
        url: "/user/subscription",
        method: "GET"
      }),
      providesTags: (result) => [
        { type: "Subscription", id: result?.uuid },
        { type: "Plan", id: result?.plan.id }
      ]
    }),
    getUserStat: builder.query<number[], void>({
      query: () => ({
        url: "/user/getStat",
        method: "GET"
      })
    }),
    getNotices: builder.query<Notice[], void>({
      query: () => ({
        url: "/user/notice/fetch",
        method: "GET"
      }),
      providesTags: (result) => [
        ...(result?.map((notice) => ({ type: "Notice" as const, id: notice.id })) || []),
        { type: "Notice" as const, id: "LIST" }
      ]
    }),
    getUserConfig: builder.query<UserConfig, void>({
      query: () => ({
        url: "/user/comm/config",
        method: "GET"
      })
    }),
    getGuestConfig: builder.query<GuestConfig, void>({
      query: () => ({
        url: "/guest/comm/config",
        method: "GET"
      })
    }),
    sendEmailVerify: builder.mutation<boolean, SendMailPayload>({
      query: (body) => ({
        url: "/passport/comm/sendEmailVerify",
        method: "POST",
        body: qs.stringify(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    }),
    resetPassword: builder.mutation<boolean, ResetPasswordPayload>({
      query: (body) => ({
        url: "/passport/auth/forget",
        method: "POST",
        body: qs.stringify(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
    }),
    register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (body) => ({
        url: "/passport/auth/register",
        method: "POST",
        body: qs.stringify(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }),
      transformResponse: (response: LoginResponse) => {
        localStorage.setItem("gfw_token", response.auth_data);
        dispatch(
          login({
            isAdmin: response.is_admin
          })
        );
        return response;
      },
      invalidatesTags: ["User", "Subscription"]
    })
  })
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useGetUserSubscriptionQuery,
  useGetUserConfigQuery,
  useGetGuestConfigQuery,
  useGetNoticesQuery,
  useGetUserStatQuery,
  useSendEmailVerifyMutation,
  useResetPasswordMutation,
  useRegisterMutation
} = api;
export default api;
