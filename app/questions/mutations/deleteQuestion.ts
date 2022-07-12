import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteQuestion = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteQuestion), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // Prisma does not yet support "cascading deletes".
  // In the context of this tutorial, that means it does not currently delete the Choice data when deleting a Question.
  // We need to temporarily augment the generated deleteQuestion mutation in order to do this manually.
  await db.choice.deleteMany({ where: { questionId: id } })
  const question = await db.question.deleteMany({ where: { id } })

  return question
})
