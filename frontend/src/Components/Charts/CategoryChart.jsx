import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const published = categories.map((c) => c.attributes.published);
    const deactivated = categories.map((c) => c.attributes.deactivated);

    setData([
      {
        name: "Published",
        data: published,
      },
      { name: "Deactivated", data: deactivated },
    ]);
  }, []);

  return (
    <>
      <div className="k-card">
        <Chart
          style={{
            height: 500,
          }}
        >
          <ChartTitle text="Portfolios analytics" />
          <ChartLegend position="top" orientation="vertifcal" />
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
