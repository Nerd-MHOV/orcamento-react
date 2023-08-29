import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetBudgetController {
  async handle(request: Request, response: Response) {
    const { q: query, f: favorite } = request.query;
    const { id } = request.user;
    console.log(query);

    if (typeof query !== "string")
      return response.status(500).json("Request not valid");

    console.log(id);

    const budgets = await prismaClient.saveBudgets.findMany({
      include: {
        responsible: true,
        favorites: true,
      },
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            ...(favorite === "true"
              ? {
                  favorites: {
                    some: {
                      user_id: {
                        equals: id,
                      },
                    },
                  },
                }
              : {}),
          },
          {
            OR: [
              {
                budgets: {
                  path: ["0", "arrComplete", "responseForm", "rd_client"],
                  string_contains: query,
                },
              },
              {
                budgets: {
                  path: ["1", "arrComplete", "responseForm", "rd_client"],
                  string_contains: query,
                },
              },
              {
                budgets: {
                  path: ["2", "arrComplete", "responseForm", "rd_client"],
                  string_contains: query,
                },
              },
              {
                budgets: {
                  path: ["3", "arrComplete", "responseForm", "rd_client"],
                  string_contains: query,
                },
              },
              {
                budgets: {
                  path: ["0", "columns", "1"],
                  string_contains: query,
                },
              },
              {
                budgets: {
                  path: ["1", "columns", "1"],
                  string_contains: query,
                },
              },
              {
                name: {
                  contains: query,
                  mode: "insensitive"
                }
              },
              {
                status: {
                  contains: query,
                  mode: "insensitive"
                }
              },
              {
                responsible: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
        ],
      },
    });
    return response.json(budgets);
  }
}
