import { z } from "zod";

const singUpSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
});

export default singUpSchema;