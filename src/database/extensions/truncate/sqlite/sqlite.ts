import type { Prisma } from '@prisma/client';

import type { SQLiteConfig } from './types';

export async function truncateSQLiteTable(
    client: Prisma.DefaultPrismaClient,
    modelName: string,
    config: SQLiteConfig = {},
): Promise<void> {
    const { resetSequence = true } = config;
    const queries = [client.$executeRawUnsafe(`DELETE FROM ${modelName}`)];

    if (resetSequence) {
        queries.push(
            client.$executeRawUnsafe(
                `UPDATE sqlite_sequence SET seq = 0 WHERE name = ${modelName}`,
            ),
        );
    }
    await client.$transaction(queries);
}
