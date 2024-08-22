'use server';

import { Post, Prisma } from '@prisma/client';
import { isNil } from 'lodash';

import { revalidateTag } from 'next/cache';

import db from '@/libs/db/client';
import { PaginateOptions, PaginateReturn } from '@/libs/db/types';
import { paginateTransform } from '@/libs/db/utils';

/**
 * 查询分页文章列表信息
 * @param options
 */
export const queryPostPaginate = async (
    options?: PaginateOptions,
): Promise<PaginateReturn<Post>> => {
    const data = await db.post.paginate({
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        page: 1,
        limit: 8,
        ...options,
    });
    return paginateTransform(data);
};

/**
 * 根据查询条件获取文章总页数
 * @param limit
 */
export const queryPostTotalPages = async (limit = 8): Promise<number> => {
    const data = await queryPostPaginate({ page: 1, limit });
    return data.meta.totalPages;
};

/**
 * 查询文章信息
 * @param id
 */
export const queryPostItem = async (id: string): Promise<Post> => {
    const item = await db.post.findUnique({ where: { id } });
    if (isNil(item)) throw new Error('post not exists!');
    return item;
};

/**
 * 新增文章
 * @param data
 */
export const createPostItem = async (data: Prisma.PostCreateInput): Promise<Post> => {
    const item = await db.post.create({ data });
    revalidateTag('posts');
    return item;
};

/**
 * 更新文章
 * @param id
 * @param data
 */
export const updatePostItem = async (
    id: string,
    data: Partial<Omit<Post, 'id'>>,
): Promise<Post> => {
    const item = await db.post.update({ where: { id }, data });
    revalidateTag('posts');
    return item;
};

/**
 * 删除文章
 * @param id
 */
export const deletePostItem = async (id: string): Promise<Post> => {
    const item = await db.post.findUnique({ where: { id } });
    await db.post.delete({ where: { id } });
    revalidateTag('posts');
    return item;
};
