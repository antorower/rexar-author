import { z } from "zod";

export const LessonsSchema = z.object({
  lessons: z.array(z.string()).min(20).max(80),
});
