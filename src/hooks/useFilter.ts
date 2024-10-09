import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export function useFilter() {
    const [nameOrLoginFilter, setNameOrLoginFilter] = useState("");
    const [groupNameFilter, setGroupNameFilter] = useState("");

    const [nameOrLoginFilterDebounced] = useDebounce(nameOrLoginFilter, 500);

    const changeNameOrLoginFilter = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNameOrLoginFilter(event.target.value);
        },
        []
    );

    const changeGroupNameFilter = useCallback((groupName: string) => {
        setGroupNameFilter(groupName);
    }, []);

    const nameOrLoginFilterDebouncedMemo = useMemo(
        () => nameOrLoginFilterDebounced,
        [nameOrLoginFilterDebounced]
    );
    const groupNameFilterMemo = useMemo(
        () => groupNameFilter,
        [groupNameFilter]
    );

    return {
        nameOrLoginFilterDebouncedMemo,
        groupNameFilterMemo,
        changeNameOrLoginFilter,
        changeGroupNameFilter,
    };
}
