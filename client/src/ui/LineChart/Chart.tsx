"use client";

import { Line, LineChart, XAxis } from "recharts";

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

interface ChartProps {
  chartData: any[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#00519D",
  },
} satisfies ChartConfig;

export const Chart = ({ chartData }: ChartProps) => {
  return (
    <Card className={"bg-eclipse"}>
      <CardHeader>
        <CardTitle>Invoice Count</CardTitle>
        <CardDescription>Invoice count by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="#00519D"
              strokeWidth={2}
              dot={{
                fill: "#00519D",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
