import React, { useContext, useState } from "react";
import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
} from "@progress/kendo-react-charts";
import "hammerjs";
import { GlobalContext } from "../../Context/global";

const CategoryChart = () => {
  const { categories } = useContext(GlobalContext);
  const cNames = categories.map((category) => category.attributes.name);
  const [data, setData] = useState([
    { name: "", data: [] },
    { name: "", data: [] },
  ]);
  console.log(setData);
  return (
    <>
      <div className="k-card">
        <Chart
          style={{
            height: 350,
          }}
        >
          <ChartTitle text="Column Chart" />
          <ChartLegend position="top" orientation="horizontal" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={cNames} startAngle={45} />
          </ChartCategoryAxis>
          <ChartSeries>
            {data.map((item, idx) => (
              <ChartSeriesItem
                key={idx}
                type="column"
                tooltip={{
                  visible: true,
                }}
                data={item.data}
                name={item.name}
              />
            ))}
          </ChartSeries>
        </Chart>
      </div>
    </>
  );
};

export default CategoryChart;
