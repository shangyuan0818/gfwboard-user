import React, { useMemo, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { filesize } from "filesize";
import { useTranslation } from "react-i18next";

// material-ui
import { useTheme } from "@mui/material/styles";

// project imports
import MainCard from "@/components/MainCard";
import { useGetTrafficLogsQuery } from "@/store/services/api";

const TrafficChart: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const [tick, setTick] = useState(7);

  const { data: trafficLogs, isLoading } = useGetTrafficLogsQuery();
  const dataMap = useMemo(
    () =>
      (trafficLogs ?? []).reduce(
        (acc, cur) =>
          acc.set(cur.record_at, {
            u:
              cur.u / (isNaN(parseInt(cur.server_rate)) ? 1 : parseInt(cur.server_rate)) +
              (acc.get(cur.record_at)?.u ?? 0),
            d:
              cur.d / (isNaN(parseInt(cur.server_rate)) ? 1 : parseInt(cur.server_rate)) +
              (acc.get(cur.record_at)?.d ?? 0),
            total: (cur.u + cur.d) / parseInt(cur.server_rate) + (acc.get(cur.record_at)?.total ?? 0)
          }),
        new Map<
          number,
          {
            u: number;
            d: number;
            total: number;
          }
        >()
      ),
    [trafficLogs]
  );

  const series = useMemo<ApexAxisChartSeries>(
    () => [
      {
        name: t("traffic.chart.upload", { context: "name" }).toString(),
        data:
          Array.from(dataMap.values())
            .map((v) => v.u)
            .slice(0, tick)
            .reverse() || Array(tick).fill(0),
        color: theme.palette.warning.main
      },
      {
        name: t("traffic.chart.download", { context: "name" }).toString(),
        data:
          Array.from(dataMap.values())
            .map((v) => v.d)
            .slice(0, tick)
            .reverse() || Array(tick).fill(0),
        color: theme.palette.success.main
      },
      {
        name: t("traffic.chart.total", { context: "name" }).toString(),
        data:
          Array.from(dataMap.values())
            .map((v) => v.total)
            .slice(0, tick)
            .reverse() || Array(tick).fill(0),
        color: theme.palette.primary.light
      }
    ],
    [trafficLogs, tick, theme.palette, t]
  );

  console.log(series);

  const options = useMemo<ApexCharts.ApexOptions>(
    () => ({
      chart: {
        height: 280,
        type: "area",
        toolbar: {
          show: false
        }
      },
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 1.5
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        position: "back",
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: "datetime",
        categories: Array.from(new Array(tick))
          .map((_, i) => dayjs().subtract(i, "day").toISOString())
          .reverse(),
        labels: {
          format: "MM.dd",
          style: {
            colors: Array.from(new Array(tick)).map(() => secondary)
          }
        },
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        tickAmount: tick
      },
      yaxis: {
        labels: {
          style: {
            colors: Array.from(new Array(tick)).map(() => secondary)
          },
          formatter(val: number): string | string[] {
            return String(filesize(val, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" }));
          }
        }
      },
      tooltip: {
        theme: theme.palette.mode,
        x: {
          format: "yyyy-MM-dd"
        },
        y: {
          formatter: (value) =>
            String(filesize(value, { base: 2, standard: "jedec", round: 2, roundingMethod: "floor" }))
        }
      }
    }),
    [tick, theme.palette, t]
  );

  console.log(options);

  return (
    <MainCard title={t("traffic.chart.title").toString()} divider={false}>
      <ReactApexChart options={options} series={series} type="area" height={280} />
    </MainCard>
  );
};

export default TrafficChart;
