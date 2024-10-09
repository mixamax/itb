import { Container } from "@mui/material";

type Props = {
    children: React.ReactNode;
};

const style = {
    backgroundColor: "#f1f1f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
};

export function Pagelayout({ children }: Props) {
    return (
        <Container component={"main"} maxWidth="lg" sx={style}>
            {children}
        </Container>
    );
}
