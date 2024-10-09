import { TUser } from "../models/user";
export function getGroupsList(users: TUser[]) {
    const groups: string[] = [];
    users.forEach((user) => {
        if (!groups.includes(user.group)) {
            groups.push(user.group);
        }
    });
    return groups.sort((a, b) => a.localeCompare(b));
}
