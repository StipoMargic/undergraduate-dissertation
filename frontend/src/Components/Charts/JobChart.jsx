/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Chart } from "@progress/kendo-react-charts";
import ChartTitle from "@progress/kendo-react-charts/dist/es/components/Title";
import ChartCategoryAxis from "@progress/kendo-react-charts/dist/es/components/CategoryAxis";
import ChartCategoryAxisItem from "@progress/kendo-react-charts/dist/es/components/CategoryAxisItem";
import ChartSeries from "@progress/kendo-react-charts/dist/es/components/Series";
import ChartSeriesItem from "@progress/kendo-react-charts/dist/es/components/SeriesItem";
import ChartCategoryAxisTitle from "@progress/kendo-react-charts/dist/es/components/category-axis-item/Title";
import { GlobalContext } from "../../Context/global";

const categories = ["6 months ago", "30 days ago", "Now"];

const JobChart = () => {
  const { jobs } = useContext(GlobalContext);
  const [data, setData] = useState([{ firstData: 0 }]);

  useEffect(() => {
    const activeNowJobs = jobs.filter((j) => j.attributes.deletedAt === null);
    setData([{ firstData: activeNowJobs.length }]);
  }, []);
  return (
    <>
      <Chart>
        <ChartTitle text="Units sold" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories}>
            <ChartCategoryAxisTitle text="Months" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem
            type="bar"
            gap={2}
            spacing={0.25}
            data={data[0].firstData}
          />
        </ChartSeries>
      </Chart>
      );
    </>
  );
};

export default JobChart;
