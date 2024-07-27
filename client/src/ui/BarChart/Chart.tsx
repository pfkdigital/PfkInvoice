"use client";

import { Bar, BarChart, XAxis } from "recharts";

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
  title: string;
  description: string;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#0084FF",
  },
} satisfies ChartConfig;

export function Chart({ chartData, title, description }: ChartProps) {
  return (
    <Card className={"bg-eclipse"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="key"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => `$ ${value}`}
                />
              }
            />
            <Bar dataKey="value" label={"Revenue"} fill="#0084FF" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
