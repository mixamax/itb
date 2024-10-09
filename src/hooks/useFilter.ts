import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useFilter() {
    const [nameOrLoginFilter, setNameOrLoginFilter] = useState("");
    const [groupNameFilter, setGroupNameFilter] = useState("");

    const [nameOrLoginFilterDebounced] = useDebounce(nameOrLoginFilter, 500);

    const changeNameOrLoginFilter = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNameOrLoginFilter(event.target.value);
    };

    const changeGroupNameFilter = (groupName: string) => {
        setGroupNameFilter(groupName);
    };

    return {
        nameOrLoginFilterDebounced,
        groupNameFilter,
        changeNameOrLoginFilter,
        changeGroupNameFilter,
    };
}
