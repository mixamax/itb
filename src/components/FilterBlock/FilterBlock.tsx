import { Box, InputBase, Paper, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const paperStyle = {
    p: "10px",
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    borderRadius: "10px",
    height: "60px",
};

const inputBaseStyle = {
    backgroundColor: "#f1f1f1",
    height: "40px",
    borderRadius: "5px",
    paddingLeft: "10px",
};

type Props = {
    changeGroupNameFilter: (groupName: string) => void;
    changeNameOrLoginFilter: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

export function FilterBlock({
    changeGroupNameFilter,
    changeNameOrLoginFilter,
}: Props) {
    const [groupName, setGroupName] = useState<string>("");

    const handleChangeGroupName = (event: SelectChangeEvent) => {
        const groupName = event.target.value;
        setGroupName(groupName);
        changeGroupNameFilter(groupName);
    };
    return (
        <Box gap={2} display={"flex"} flexWrap={"wrap"}>
            <Paper sx={paperStyle}>
                <Typography variant="body2">Логин или имя:</Typography>
                <InputBase
                    placeholder="Search"
                    sx={inputBaseStyle}
                    onChange={changeNameOrLoginFilter}
                />
            </Paper>
            <Paper sx={paperStyle}>
                <Typography variant="body2">Группа:</Typography>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                        displayEmpty
                        value={groupName}
                        onChange={handleChangeGroupName}
                        input={<InputBase sx={inputBaseStyle} />}
                        notched={undefined}

                        // renderValue={(selected) => {
                        //     if (selected.length === 0) {
                        //         return <em>Placeholder</em>;
                        //     }
                        // }}

                        //     return selected.join(", ");
                        // }}
                        // MenuProps={MenuProps}
                        // inputProps={{ "aria-label": "Without label" }}
                    >
                        {/* <MenuItem disabled value="">
                            <em>Все</em>
                        </MenuItem> */}
                        <MenuItem value={""}>все группы</MenuItem>
                        <MenuItem value={"10"}>Ten</MenuItem>
                        <MenuItem value={"20"}>Twenty</MenuItem>
                        <MenuItem value={"30"}>Thirty</MenuItem>
                        {/* {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))} */}
                    </Select>
                </FormControl>
            </Paper>
        </Box>
    );
}
