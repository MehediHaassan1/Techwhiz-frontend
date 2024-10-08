"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Users, FileText, DollarSign, LucideProps } from "lucide-react";

import { useGetAnalytics } from "@/src/hooks/analytics.hook";
import Loading from "@/src/components/Loading";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.FC<LucideProps>;
  color: string;
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Card className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <CardBody className="flex flex-row items-center justify-between p-6">
        <div>
          <p className="text-sm text-default-500 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>
          <Icon size={40} />
        </div>
      </CardBody>
    </Card>
  </motion.div>
);

export default function AdminDashboardPage() {
  const [activeChart, setActiveChart] = useState("combined");
  const { data }: any = useGetAnalytics();

  if (!data?.data) {
    return <Loading />;
  }

  const userStats = [
    { name: "Total Users", value: data?.data?.totalUsers },
    { name: "Active Users", value: data?.data?.activeUsers },
  ];

  const postStats = [
    { name: "Total Posts", value: data?.data?.totalPosts },
    { name: "Avg Posts/User", value: data?.data?.averagePostsPerUser },
  ];

  const paymentStats = [
    { name: "Total Revenue", value: data?.data?.totalRevenue },
    { name: "Avg Payment", value: data?.data?.averagePaymentAmount },
    { name: "Users with Payments", value: data?.data?.usersWithPayments },
    {
      name: "Avg Payments/User",
      value: data?.data?.averagePaymentsPerUser,
    },
  ];

  const combinedData = [
    { name: "Total Users", value: data?.data?.totalUsers },
    { name: "Active Users", value: data?.data?.activeUsers },
    { name: "Total Posts", value: data?.data?.totalPosts },
    { name: "Avg Posts/User", value: data?.data?.averagePostsPerUser },
    { name: "Total Revenue", value: data?.data?.totalRevenue },
    { name: "Avg Payment", value: data?.data?.averagePaymentAmount },
    { name: "Users with Payments", value: data?.data?.usersWithPayments },
    {
      name: "Avg Payments/User",
      value: data?.data?.averagePaymentsPerUser,
    },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Dashboard data?.data
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          color="text-blue-500"
          icon={FileText}
          title="Total Posts"
          value={data?.data?.totalPosts}
        />
        <SummaryCard
          color="text-green-500"
          icon={Users}
          title="Total Users"
          value={data?.data?.totalUsers}
        />
        <SummaryCard
          color="text-yellow-500"
          icon={DollarSign}
          title="Total Revenue"
          value={`$${data?.data?.totalRevenue.toLocaleString()}`}
        />
      </div>

      {/* Chart Selection Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          className="rounded"
          color={activeChart === "combined" ? "primary" : "default"}
          onClick={() => setActiveChart("combined")}
        >
          Combined
        </Button>
        <Button
          className="rounded"
          color={activeChart === "users" ? "primary" : "default"}
          onClick={() => setActiveChart("users")}
        >
          Users
        </Button>
        <Button
          className="rounded"
          color={activeChart === "posts" ? "primary" : "default"}
          onClick={() => setActiveChart("posts")}
        >
          Posts
        </Button>
        <Button
          className="rounded"
          color={activeChart === "payments" ? "primary" : "default"}
          onClick={() => setActiveChart("payments")}
        >
          Payments
        </Button>
      </div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader className="pb-0 pt-6 px-4 flex-col items-start">
            <h4 className="font-bold text-large capitalize">
              {activeChart} Statistics
            </h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            {activeChart === "combined" && (
              <ResponsiveContainer height={400} width="100%">
                <BarChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    angle={-45}
                    dataKey="name"
                    height={70}
                    textAnchor="end"
                  />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {combinedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === "users" && (
              <ResponsiveContainer height={400} width="100%">
                <PieChart>
                  <Pie
                    label
                    cx="50%"
                    cy="50%"
                    data={userStats}
                    dataKey="value"
                    fill="#8884d8"
                    nameKey="name"
                    outerRadius={150}
                  >
                    {userStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeChart === "posts" && (
              <ResponsiveContainer height={400} width="100%">
                <BarChart data={postStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {postStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === "payments" && (
              <ResponsiveContainer height={400} width="100%">
                <LineChart data={paymentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    dataKey="value"
                    dot={{ r: 8 }}
                    stroke="#8884d8"
                    strokeWidth={2}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
