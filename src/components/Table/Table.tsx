import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { TUser } from "../../models/user";
import { CustomButton } from "../CustomButton/CustomButton";
import { filterData } from "../../utils/filterData";

interface ColumnData {
    dataKey: keyof TUser | "actions";
    label: string;
    // numeric?: boolean;
    width?: number;
}

const columns: ColumnData[] = [
    {
        // width: 100,
        label: "Name",
        dataKey: "name",
    },
    {
        // width: 100,
        label: "Login",
        dataKey: "login",
    },
    {
        // width: 100,
        label: "Group",
        dataKey: "group",
        // numeric: true,
    },
    {
        // width: 110,
        label: "Active",
        dataKey: "active",
    },
    {
        // width: 130,
        label: "Actions",
        dataKey: "actions",
    },
];

const VirtuosoTableComponents: TableComponents<TUser> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table
            {...props}
            sx={{
                borderCollapse: "separate",
                tableLayout: "fixed",
                borderRadius: 10,
                minWidth: "460px",
            }}
        />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow sx={{ backgroundColor: "lightgray" }}>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    // align={column.numeric || false ? "right" : "left"}
                    align="center"
                    style={{ width: column.width }}
                    sx={{
                        fontWeight: 700,
                        padding: "16px 10px",
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: TUser, user: TUser) {
    return (
        <>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    // align={column.numeric || false ? "right" : "left"}
                    align="center"
                    sx={{
                        padding: "16px 10px",
                        backgroundColor: _index % 2 ? "#f1f1f1" : "white",
                    }}
                >
                    {column.dataKey !== "actions" &&
                        column.dataKey !== "active" &&
                        row[column.dataKey]}
                    {column.dataKey === "active" &&
                        (row.active ? "Активен" : "Не активен")}
                    {column.dataKey === "actions" && (
                        <CustomButton user={user} active={row.active} />
                    )}
                </TableCell>
            ))}
        </>
    );
}

type TableProps = {
    data: TUser[];
    nameOrLoginFilter: string;
    groupNameFilter: string;
};
export function VirtualizedTable({
    data,
    nameOrLoginFilter,
    groupNameFilter,
}: TableProps) {
    return (
        <Paper
            style={{
                height: 400,
                width: "100%",
                marginTop: 50,
                borderRadius: 10,
            }}
        >
            <TableVirtuoso
                style={{ borderRadius: 10 }}
                data={filterData(data, nameOrLoginFilter, groupNameFilter)}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(index, row) =>
                    rowContent(index, row, data[index])
                }
            />
        </Paper>
    );
}
