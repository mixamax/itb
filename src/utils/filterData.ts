import { TUser } from "../models/user";
export function filterData(
    data: TUser[],
    nameOrLoginFilter: string,
    groupNameFilter: string
) {
    return data.filter((user) => {
        const nameOrLoginMatch = nameOrLoginFilter
            ? user.name
                  .toLowerCase()
                  .includes(nameOrLoginFilter.toLowerCase()) ||
              user.login.toLowerCase().includes(nameOrLoginFilter.toLowerCase())
            : true;

        const groupMatch = groupNameFilter
            ? user.group === groupNameFilter
            : true;

        return nameOrLoginMatch && groupMatch;
    });
}
