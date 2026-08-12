"use client"
import {
    Users,
    Home,
    CreditCard,
    ClipboardList,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5100 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6200 },
    { month: "May", revenue: 7100 },
    { month: "Jun", revenue: 8300 },
];

const userData = [
    { role: "Tenants", users: 420 },
    { role: "Landlords", users: 180 },
    { role: "Admins", users: 8 },
];

const requestData = [
    { status: "Approved", value: 65, fill: "var(--color-approved)" },
    { status: "Pending", value: 20, fill: "var(--color-pending)" },
    { status: "Rejected", value: 15, fill: "var(--color-rejected)" },
];

const revenueChartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--primary))",
    },
};

const userChartConfig = {
    users: {
        label: "Users",
        color: "hsl(var(--primary))",
    },
};

const requestChartConfig = {
    approved: {
        label: "Approved",
        color: "hsl(142 76% 36%)",
    },
    pending: {
        label: "Pending",
        color: "hsl(38 92% 50%)",
    },
    rejected: {
        label: "Rejected",
        color: "hsl(0 84% 60%)",
    },
};

const charts = () => {
    return (
        <div className="container mx-auto space-y-8 py-8 px-4">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground mt-1">
                    Overview of your RentNest platform.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Users */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>

                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            608
                        </div>

                        <p className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>

                {/* Properties */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Properties
                        </CardTitle>

                        <Home className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            245
                        </div>

                        <p className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <ArrowUpRight className="h-3 w-3" />
                            +8 new this month
                        </p>
                    </CardContent>
                </Card>

                {/* Rental Requests */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rental Requests
                        </CardTitle>

                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            132
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                            20 pending requests
                        </p>
                    </CardContent>
                </Card>

                {/* Revenue */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>

                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            $35,700
                        </div>

                        <p className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            +18.2% from last month
                        </p>
                    </CardContent>
                </Card>

            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-7">

                {/* Revenue Chart */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>

                        <CardDescription>
                            Monthly revenue for the current year
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ChartContainer
                            config={revenueChartConfig}
                            className="h-[300px] w-full"
                        >
                            <LineChart
                                data={revenueData}
                                margin={{
                                    left: 10,
                                    right: 10,
                                    top: 10,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--color-revenue)"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Rental Requests */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Rental Requests</CardTitle>

                        <CardDescription>
                            Current request distribution
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ChartContainer
                            config={requestChartConfig}
                            className="mx-auto h-[300px] w-full"
                        >
                            <PieChart>
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />

                                <Pie
                                    data={requestData}
                                    dataKey="value"
                                    nameKey="status"
                                    innerRadius={65}
                                    outerRadius={100}
                                    strokeWidth={5}
                                />
                            </PieChart>
                        </ChartContainer>

                        <div className="flex justify-center gap-5 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                Approved
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                Pending
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                Rejected
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Users Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>User Distribution</CardTitle>

                    <CardDescription>
                        Users grouped by their platform roles
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <ChartContainer
                        config={userChartConfig}
                        className="h-[300px] w-full"
                    >
                        <BarChart
                            data={userData}
                            margin={{
                                left: 10,
                                right: 10,
                                top: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="role"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                            />

                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />

                            <Bar
                                dataKey="users"
                                fill="var(--color-users)"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
};

export default charts;