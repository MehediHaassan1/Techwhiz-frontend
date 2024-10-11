"use client";

import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useGetUserAnalytics } from "@/src/hooks/analytics.hook";
import { IAggregatedTotals, IMonthlyAnalytics } from "@/src/types";

import UserData from "./UserData";

export default function Component() {
  const { data } = useGetUserAnalytics();

  const chartData = data?.data as IMonthlyAnalytics[];

  const analyticsData: IMonthlyAnalytics[] | undefined = chartData?.map(
    (data) => ({
      month: data.month,
      totalPosts: data.totalPosts,
      totalAmount: data.totalAmount,
      totalFollowers: data.totalFollowers,
      totalFollowings: data.totalFollowings,
    }),
  );

  const aggregateTotals: IAggregatedTotals | undefined = analyticsData?.reduce(
    (totals, monthData) => ({
      totalFollowers: totals.totalFollowers + monthData.totalFollowers,
      totalFollowings: totals.totalFollowings + monthData.totalFollowings,
      totalPayments: totals.totalPayments + monthData.totalAmount,
      totalPosts: totals.totalPosts + monthData.totalPosts,
    }),
    {
      totalFollowers: 0,
      totalFollowings: 0,
      totalPayments: 0,
      totalPosts: 0,
    },
  );

  return (
    <>
      <UserData total={aggregateTotals} />
      <div className="h-[300px] w-full">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart
            data={analyticsData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPosts" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLikes" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDislikes" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComments" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Plotting each metric as a separate Area */}
            <Area
              dataKey="totalPosts"
              fill="url(#colorPosts)"
              fillOpacity={1}
              stroke="#8884d8"
              type="monotone"
            />
            <Area
              dataKey="totalAmount"
              fill="url(#colorLikes)"
              fillOpacity={1}
              stroke="#82ca9d"
              type="monotone"
            />
            <Area
              dataKey="totalFollowers"
              fill="url(#colorDislikes)"
              fillOpacity={1}
              stroke="#ffc658"
              type="monotone"
            />
            <Area
              dataKey="totalFollowings"
              fill="url(#colorComments)"
              fillOpacity={1}
              stroke="#ff7300"
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
