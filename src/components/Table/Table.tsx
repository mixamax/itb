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

interface ColumnData {
    dataKey: keyof TUser | "actions";
    label: string;
    width?: number;
}

const columns: ColumnData[] = [
    {
        label: "Name",
        dataKey: "name",
    },
    {
        label: "Login",
        dataKey: "login",
    },
    {
        label: "Group",
        dataKey: "group",
    },
    {
        label: "Active",
        dataKey: "active",
    },
    {
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
};
export function VirtualizedTable({ data }: TableProps) {
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
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(index, row) =>
                    rowContent(index, row, data[index])
                }
            />
        </Paper>
    );
}
