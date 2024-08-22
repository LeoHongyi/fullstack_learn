import { Post, Prisma } from '@prisma/client';

/**
 * 文章创建表单组件参数
 */
export interface PostCreateFormProps {
    type: 'create';
    // 提交按钮的文字
    submitText: string;
}

/**
 * 文章更新表组件单参数
 */
export interface PostUpdateFormProps {
    type: 'update';
    // 提交按钮的文章
    submitText: string;
    // 原来的文章数据，用于与表单中编辑后的新数据合并，然后更新
    item: Post;
}

/**
 * 文章创建表单处理函数的参数类型
 */
export type PostCreateData = Prisma.PostCreateInput;

/**
 * 文章创建表单更新函数的参数类型
 */
export type PostUpdateData = Partial<Omit<Post, 'id'>> & { id: string };

/**
 * 文章创建/编辑表单的参数类型
 */
export type PostActionFormProps = PostCreateFormProps | PostUpdateFormProps;
