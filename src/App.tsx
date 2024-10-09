import { CircularProgress } from "@mui/material";
import { FilterBlock } from "./components/FilterBlock/FilterBlock";
import { Pagelayout } from "./components/PageLayout/Pagelayout";
import { userApi } from "./services/userApi";
import { VirtualizedTable } from "./components/Table/Table";
import { useFilter } from "./hooks/useFilter";
import { getGroupsList } from "./utils/getGroupsList";
import { filterData } from "./utils/filterData";

function App() {
    const { data, isError, isLoading } = userApi.useGetUserQuery();
    const {
        nameOrLoginFilterDebouncedMemo: nameOrLoginFilterDebounced,
        groupNameFilterMemo: groupNameFilter,
        changeNameOrLoginFilter,
        changeGroupNameFilter,
    } = useFilter();

    const groupNameList = getGroupsList(data || []); // если список групп захардкодить, то можно уменьшить количество ререндеров FilterBlock

    return (
        <Pagelayout>
            {isLoading && <CircularProgress size={100} />}
            {isError && <div>Упс, что-то пошло не так</div>}
            {data && (
                <>
                    <FilterBlock
                        changeGroupNameFilter={changeGroupNameFilter}
                        changeNameOrLoginFilter={changeNameOrLoginFilter}
                        groupNameList={groupNameList}
                    />
                    <VirtualizedTable
                        data={filterData(
                            data,
                            nameOrLoginFilterDebounced,
                            groupNameFilter
                        )}
                    />
                </>
            )}
        </Pagelayout>
    );
}

export default App;
