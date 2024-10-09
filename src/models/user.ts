import { z } from "zod";

export const UserSchema = z.object({
    createdAt: z.string(),
    name: z.string(),
    login: z.string(),
    group: z.string(),
    active: z.boolean(),
    id: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;
