import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // the rest of your code
  const currentPage = req.body.currentPage
  const perPage = req.body.perPage
  const totalCount = await prisma.cover.count()
  const pageCount = Math.ceil(totalCount / perPage)
  const covers = await prisma.cover.findMany({
    skip: currentPage > 1 ? (currentPage-1) * perPage : undefined,
    take: perPage
  })
  res.json({
    meta: {
      itemCount: totalCount,
      pageCount: pageCount,
    },
    result: covers
  })
}
