/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Chart, ChartLegend } from "@progress/kendo-react-charts";
import ChartTitle from "@progress/kendo-react-charts/dist/es/components/Title";
import ChartCategoryAxis from "@progress/kendo-react-charts/dist/es/components/CategoryAxis";
import ChartCategoryAxisItem from "@progress/kendo-react-charts/dist/es/components/CategoryAxisItem";
import ChartSeries from "@progress/kendo-react-charts/dist/es/components/Series";
import ChartSeriesItem from "@progress/kendo-react-charts/dist/es/components/SeriesItem";
import ChartTooltip from "@progress/kendo-react-charts/dist/es/components/Tooltip";
import { GlobalContext } from "../../Context/global";
import {
  lastMonth,
  sixMonthsAgo,
  threeMonthsAgo,
  yesterday,
} from "../../Utils/dates";

const categories = [
  "In last 6 months",
  "In last 3 months",
  "In last 30 days",
  "In last 24 hours",
];

const renderTooltip = (context) => {
  const { category, value } = context.point || context;
  return (
    <div>
      {category}: {value}
    </div>
  );
};

const JobChart = () => {
  const { jobs } = useContext(GlobalContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const inLastSixMonthsCreated = jobs.filter(
      (j) => new Date(j.attributes.createdAt).getTime() > sixMonthsAgo()
    );
    const inLastSixMonthsDeactivated = jobs.filter(
      (j) => new Date(j.attributes.deletedAt).getTime() > sixMonthsAgo()
    );
    const inLastThreeMonthsCreated = jobs.filter(
      (j) => new Date(j.attributes.createdAt).getTime() > threeMonthsAgo()
    );
    const inLastThreeMonthsDeactivated = jobs.filter(
      (j) => new Date(j.attributes.deletedAt).getTime() > threeMonthsAgo()
    );
    const inLastThirtyDaysCreated = jobs.filter(
      (j) => new Date(j.attributes.createdAt).getTime() > lastMonth()
    );
    const inLastThirtyDaysDeactivated = jobs.filter(
      (j) => new Date(j.attributes.deletedAt).getTime() > lastMonth()
    );
    const inLastDayCreated = jobs.filter(
      (j) => new Date(j.attributes.createdAt).getTime() > yesterday()
    );
    const inLastDayDeactivated = jobs.filter(
      (j) => new Date(j.attributes.deletedAt).getTime() > yesterday()
    );
    setData([
      {
        name: "Created",
        data: [
          inLastSixMonthsCreated.length,
          inLastThreeMonthsCreated.length,
          inLastThirtyDaysCreated.length,
          inLastDayCreated.length,
        ],
      },
      {
        name: "Deactivated",
        data: [
          inLastSixMonthsDeactivated.length,
          inLastThreeMonthsDeactivated.length,
          inLastThirtyDaysDeactivated.length,
          inLastDayDeactivated.length,
        ],
      },
    ]);
  }, [jobs]);

  return (
    <>
      <div className="col-12 mt-5">
        <Chart>
          <ChartTitle text="Job Analytics" />
          <ChartLegend position="top" orientation="horizontal" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} />
          </ChartCategoryAxis>
          <ChartTooltip render={renderTooltip} />
          <ChartSeries>
            {data.map((d, idx) => {
              return (
                <ChartSeriesItem
                  id={idx}
                  type="bar"
                  gap={2}
                  spacing={0.25}
                  data={d.data}
                  name={d.name}
                />
              );
            })}
          </ChartSeries>
        </Chart>
      </div>
    </>
  );
};
export default JobChart;
