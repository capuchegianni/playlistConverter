import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ locals: { locale } }) => {
    throw redirect(303, `/${locale}/dashboard`)
}