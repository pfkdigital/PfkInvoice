"use client";

import { Area, AreaChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/chart";

import { GraphDataType } from "@/types/invoice.types";

interface ChartProps {
  chartData: GraphDataType[];
}

const chartConfig = {
  value: {
    label: "Invoice Count",
    color: "#0084FF",
  },
} satisfies ChartConfig;

export function Chart({ chartData }: ChartProps) {
  return (
    <Card className={"bg-eclipse"}>
      <CardHeader>
        <CardTitle>Invoice Count</CardTitle>
        <CardDescription>
          The total number of invoices generated each month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="key"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area dataKey="value" type="natural" fill="#0084FF" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Chart;
