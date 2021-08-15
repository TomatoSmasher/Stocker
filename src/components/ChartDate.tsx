import React from "react";
import { createChart } from "lightweight-charts";

import classes from "./ChartDate.module.css";
const ChartDate: React.FC<{ items: string }> = (props) => {
  const fetchDataHandler = async (date: number) => {
    const fetchData = await fetch(
      "https://api.twelvedata.com/time_series?symbol=AMZN&interval=1day&outputsize=2000&apikey=a24970c9566c49739e8009cdb3a639f0"
    );

    const data = await fetchData.json();

    const dataSixMonths = data.values.slice(0, date);
    console.log(dataSixMonths);

    const transformToGraphData = dataSixMonths.map(
      (val: {
        datetime: string;
        close: number;
      }): { time: string; value: number } => {
        return { time: val.datetime, value: val.close };
      }
    );
    transformToGraphData.reverse();
    const chartCanvas = document.querySelector(".tv-lightweight-charts");

    const chartCanvas1: any = document.getElementById("chart-dates-container");

    if (chartCanvas) {
      chartCanvas.remove();
    }

    const chart: any = createChart(chartCanvas1, {
      width: 600,
      height: 400,
    });
    chart.applyOptions({
      handleScroll: false,
      handleScale: false,
      priceScale: {
        autoScale: true,
        borderVisible: false,
      },

      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    chart.timeScale().fitContent();
    const areaSeries = chart.addAreaSeries();
    areaSeries.setData(transformToGraphData);

    const dataLastEl = dataSixMonths.length - 1;

    if (+dataSixMonths[0].close > +dataSixMonths[dataLastEl].close) {
      areaSeries.applyOptions({
        lineColor: "#34A853",
        topColor: "rgba(52, 168, 83, 0.4)",
        bottomColor: "rgba(52, 168, 83, 0)",

        lineWidth: 3,
      });
    } else {
      areaSeries.applyOptions({
        lineColor: "#EA4335",
        topColor: "rgba(234, 67, 53, 0.4)",
        bottomColor: "rgba(234, 67, 53, 0)",
        lineWidth: 3,
      });
    }
  };

  return (
    <div className={classes["chart-dates-container"]}>
      <div
        className={classes["chart-dates-wrapper"]}
        id="chart-dates-container"
      >
        <ul className={classes["chart-dates-ul"]}>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(8)}
          >
            10D
          </li>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(21)}
          >
            1M
          </li>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(21 * 3)}
          >
            3M
          </li>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(21 * 6)}
          >
            6M
          </li>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(21 * 12)}
          >
            1Y
          </li>
          <li
            className={classes["chart-dates"]}
            onClick={() => fetchDataHandler(21 * 12 * 5)}
          >
            5Y
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ChartDate;
