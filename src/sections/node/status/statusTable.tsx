import React, { useMemo } from "react";

// third-party
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import lo from "lodash-es";

// material-ui
import { Box, Chip, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from "@mui/x-data-grid";

// project imports
import { useGetServersQuery } from "@/store/services/api";
import type Server from "@/model/server";
import { makeStyles } from "@/themes/hooks";

// assets
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const useStyles = makeStyles()((theme) => ({
  icon: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  successIcon: {
    color: theme.palette.success.main,
    fontSize: ".8rem"
  },
  errorIcon: {
    color: theme.palette.error.main,
    fontSize: ".8rem"
  },
  rateBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  rateChip: {
    minWidth: theme.spacing(8)
  }
}));

const StatusTable: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation();
  const { data } = useGetServersQuery(undefined, {
    pollingInterval: 10 * 1000
  });
  const { classes } = useStyles();

  const columns = useMemo<GridColDef<Server>[]>(
    () => [
      {
        field: "id",
        headerName: t("node.status.table.id_header").toString()
      },
      {
        field: "name",
        headerName: t("node.status.table.name_header").toString(),
        minWidth: 160,
        sortable: true,
        filterable: true
      },
      {
        field: "last_check_at",
        headerName: t("node.status.table.status_header").toString(),
        width: 120,
        sortable: false,
        valueGetter: (params: GridValueGetterParams<string, Server>) => {
          const { value } = params;
          return value && Math.abs(dayjs.unix(parseInt(value)).diff(dayjs(), "minute")) <= 5;
        },
        renderCell: (params: GridRenderCellParams<boolean, Server>) => {
          return (
            <Box className={classes.icon}>
              {params.value ? (
                <CheckCircleFilled className={classes.successIcon} />
              ) : (
                <CloseCircleFilled className={classes.errorIcon} />
              )}
            </Box>
          );
        }
      },
      {
        field: "type",
        headerName: t("node.status.table.type_header").toString(),
        width: 160,
        sortable: false,
        valueFormatter: (params: GridValueFormatterParams<string>) => lo.capitalize(params.value)
      },
      {
        field: "rate",
        headerName: t("node.status.table.rate_header").toString(),
        width: 120,
        sortable: false,
        renderCell: (params: GridRenderCellParams<string, Server>) => (
          <Box className={classes.rateBox}>
            <Chip label={`${params.value} x`} size="small" className={classes.rateChip} />
          </Box>
        )
      },
      {
        field: "tags",
        headerName: t("node.status.table.tags_header").toString(),
        minWidth: 160,
        sortable: false,
        renderCell: (params: GridRenderCellParams<string[] | null, Server>) => (
          <Stack direction="row" spacing={1}>
            {params.value?.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )
      }
    ],
    [data, t, classes]
  );

  return (
    <DataGrid
      columns={columns}
      rows={data?.filter((datum) => datum.show === 1) ?? []}
      className={className}
      autoPageSize
      localeText={{
        noRowsLabel: t("node.status.table.no_rows").toString(),
        columnMenuSortAsc: t("node.status.table.sort", { context: "asc" }).toString(),
        columnMenuSortDesc: t("node.status.table.sort", { context: "desc" }).toString(),
        columnMenuUnsort: t("node.status.table.unsort").toString(),
        columnMenuFilter: t("node.status.table.filter").toString(),
        columnMenuHideColumn: t("node.status.table.hide_column").toString(),
        columnMenuShowColumns: t("node.status.table.show_column").toString(),
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) =>
            t("node.status.table.pagination", { from, to, count }).toString(),
          labelRowsPerPage: t("node.status.table.rows_per_page").toString()
        }
      }}
    />
  );
};

export default StatusTable;
