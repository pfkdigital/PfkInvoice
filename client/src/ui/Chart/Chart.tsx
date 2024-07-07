"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { GraphDataType } from "@/types/invoice.types";

interface ChartProps {
  data: GraphDataType[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0084FF",
  },
} satisfies ChartConfig;

export function Chart({ data }: ChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="revenue"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <Bar dataKey="revenue" fill="#0084FF" radius={10} width={10} />
      </BarChart>
    </ChartContainer>
  );
}

export default Chart;
