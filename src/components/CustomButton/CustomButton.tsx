import { Button, useMediaQuery, useTheme } from "@mui/material";
import { userApi } from "../../services/userApi";
import { TUser } from "../../models/user";

type Props = {
    user: TUser;
    active: boolean;
};

export function CustomButton({ user, active }: Props) {
    const theme = useTheme();
    const isXSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
    return (
        <Button
            disabled={isLoading}
            size="small"
            sx={{
                fontSize: "10px",
                backgroundColor: active ? "red" : "",
            }}
            variant="contained"
            onClick={() => {
                updateUser({
                    ...user,
                    active: !user.active,
                });
            }}
        >
            {isXSmallScreen && (active ? "выкл" : "вкл")}
            {!isXSmallScreen && (active ? "выключить" : "включить")}
        </Button>
    );
}
