import { base, zh_CN, en, Faker } from '@faker-js/faker';
import { omit } from 'lodash';
import { PaginationResult } from 'prisma-paginate';

import { PaginateReturn } from './types';

export const paginateTransform = <M, R extends PaginationResult<M[]>>(
    data: R,
): PaginateReturn<M> => {
    const { result } = data;
    return {
        items: result as M[],
        meta: {
            itemCount: result.length,
            totalItems: data.count,
            perPage: data.limit,
            totalPages: data.totalPages,
            currentPage: data.page,
            ...omit(data, ['result', 'count', 'limit', 'page', 'totalPages']),
        },
    };
};

export const faker = new Faker({
    locale: [zh_CN, en, base],
});
