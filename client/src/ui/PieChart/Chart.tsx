"use client";

import { Cell, Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/chart";
import { GraphDataType } from "@/types/invoice.types";

interface ChartProps {
  chartData: GraphDataType[];
}

const chartConfig: ChartConfig = {
  paid: {
    label: "Paid Invoices",
    color: "#0084FF",
  },
  unpaid: {
    label: "Unpaid Invoices",
    color: "#8FC9FF",
  },
};

export function Chart({ chartData }: ChartProps) {
  return (
    <Card className="flex flex-col bg-eclipse">
      <CardHeader className="items-start pb-0">
        <CardTitle>Invoice Status Distribution</CardTitle>
        <CardDescription>Paid vs Unpaid invoices</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="key"
              innerRadius={60}
              className={"border-none"}
              type={"monotone"}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.key].color}
                />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="key" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Chart;
