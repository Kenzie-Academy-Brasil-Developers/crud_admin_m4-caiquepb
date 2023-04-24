import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(20),
    email: z.string().email().max(100),
    password: z.string().min(4).max(120),
    admin: z.boolean().optional(),
    active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const updateUserSchema = userSchema.omit({ id: true, password: true });

const responseUserListSchema = z.array(responseUserSchema);

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema, responseUserListSchema };
