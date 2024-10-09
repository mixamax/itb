import { CircularProgress } from "@mui/material";
import { FilterBlock } from "./components/FilterBlock/FilterBlock";
import { Pagelayout } from "./components/PageLayout/Pagelayout";
import { userApi } from "./services/userApi";
import { VirtualizedTable } from "./components/Table/Table";
import { useFilter } from "./hooks/useFilter";

function App() {
    const { data, isError, isLoading } = userApi.useGetUserQuery();

    const {
        nameOrLoginFilterDebounced,
        groupNameFilter,
        changeNameOrLoginFilter,
        changeGroupNameFilter,
    } = useFilter();

    return (
        <Pagelayout>
            {isLoading && <CircularProgress size={100} />}
            {isError && <div>Упс, что-то пошло не так</div>}
            {data && (
                <>
                    <FilterBlock
                        changeGroupNameFilter={changeGroupNameFilter}
                        changeNameOrLoginFilter={changeNameOrLoginFilter}
                    />
                    <VirtualizedTable
                        data={data}
                        nameOrLoginFilter={nameOrLoginFilterDebounced}
                        groupNameFilter={groupNameFilter}
                    />
                </>
            )}
        </Pagelayout>
    );
}

export default App;
