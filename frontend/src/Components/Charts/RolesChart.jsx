/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Chart, ChartLegend, ChartTitle } from "@progress/kendo-react-charts";
import ChartTooltip from "@progress/kendo-react-charts/dist/es/components/Tooltip";
import ChartSeries from "@progress/kendo-react-charts/dist/es/components/Series";
import ChartSeriesItem from "@progress/kendo-react-charts/dist/es/components/SeriesItem";
import ChartSeriesLabels from "@progress/kendo-react-charts/dist/es/components/series-item/Labels";
import { COLORS } from "../../Constants/colors";
import { GlobalContext } from "../../Context/global";
import { ADMIN, COMPANY } from "../../Constants/roles";
import { lastMonth, yesterday } from "../../Utils/dates";

const initialRoleData = {
  administrators: 0,
  companies: 0,
  freelancers: 0,
};

const options = [
  {
    value: "Last 24 hours",
    text: "Last 24 hours",
  },
  {
    value: "Last month",
    text: "Last month",
  },
];

const chartData = (roleData) => {
  return [
    {
      status: "Administrators",
      value: roleData.administrators,
      color: COLORS.administrators,
    },
    {
      status: "Companies",
      value: roleData.companies,
      color: COLORS.companies,
    },
    {
      status: "Freelancers",
      value: roleData.freelancers,
      color: COLORS.freelancers,
    },
  ];
};

const renderTooltip = (context) => {
  const { category, value } = context.point || context;
  return (
    <div>
      {category}: {value}
    </div>
  );
};

const labelContent = (e) => e.category;

const RolesChart = () => {
  const { users } = useContext(GlobalContext);
  const [roleData, setRoleData] = useState(initialRoleData);
  const [chartUsers, setChartUsers] = useState(users);
  const [dates, setDates] = useState({
    yesterday: yesterday(),
    lastMonth: lastMonth(),
  });

  useEffect(() => {
    setRoleData({ administrators: 0, companies: 0, freelancers: 0 });

    chartUsers.forEach((user) => {
      if (user.attributes.roles[0] === ADMIN) {
        setRoleData((prev) => ({
          ...prev,
          administrators: prev.administrators + 1,
        }));
      } else if (user.attributes.roles[0] === COMPANY) {
        setRoleData((prev) => ({
          ...prev,
          companies: prev.companies + 1,
        }));
      } else {
        setRoleData((prev) => ({
          ...prev,
          freelancers: prev.freelancers + 1,
        }));
      }
    });
  }, [chartUsers]);

  const handleRoleChange = (e) => {
    if (e.target.value === "Last 24 hours") {
      const newerThanYesterday = users.filter(
        (user) =>
          new Date(user.attributes.createdAt).getTime() >
          dates.yesterday.getTime()
      );
      setChartUsers(newerThanYesterday);
    }
    if (e.target.value === "Last month") {
      const newerThanMonth = users.filter(
        (user) =>
          new Date(user.attributes.createdAt).getTime() >
          dates.lastMonth.getTime()
      );
      setChartUsers(newerThanMonth);
    }
    if (e.target.value === "From first day") {
      setChartUsers(users);
    }
  };

  return (
    <>
      <select id="sort" className="form-control" onChange={handleRoleChange}>
        <option value="From first day" selected>
          From first day
        </option>
        {options.map((option, idx) => {
          return (
            <option key={idx} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      <h6 className="text-center text-info mt-4">Users by role</h6>
      {roleData.administrators === 0 &&
      roleData.companies === 0 &&
      roleData.freelancers === 0 ? (
        <h6 className="text-center text-danger mt-4">
          There is no new users in selected period
        </h6>
      ) : (
        <Chart>
          <ChartLegend visible={false} />
          <ChartTooltip render={renderTooltip} />
          <ChartSeries>
            <ChartSeriesItem
              type="donut"
              categoryField="status"
              field="value"
              data={chartData(roleData)}
            >
              <ChartSeriesLabels
                color="#fff"
                background="none"
                content={labelContent}
              />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
      )}
    </>
  );
};

export default RolesChart;
