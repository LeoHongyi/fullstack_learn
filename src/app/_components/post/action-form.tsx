'use client';

import { Post } from '@prisma/client';
import { isNil, omit } from 'lodash';
import 'md-editor-rt/lib/style.css';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createPostItem, updatePostItem } from '@/app/actions/post';

import { getRandomInt } from '@/libs/random';

import { MarkdownEditor } from '../markdown/editor';
import { MarkdownEditorProps } from '../markdown/type';
import { Button } from '../shadcn/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../shadcn/form';
import { Input } from '../shadcn/input';
import { Textarea } from '../shadcn/textarea';

import { PostActionFormProps, PostCreateData, PostUpdateData } from './types';

export const PostActionForm: FC<PostActionFormProps> = (props) => {
    const router = useRouter();
    const [body, setBody] = useState(props.type === 'create' ? '文章内容' : props.item.body);
    // 数据提交处理函数
    const submitHandle = useCallback(
        async (data: PostCreateData | PostUpdateData) => {
            let post: Post;
            try {
                post =
                    // 更新文章
                    props.type === 'update'
                        ? await updatePostItem(
                              (data as PostUpdateData).id,
                              omit(data as PostUpdateData, ['id']),
                          )
                        : // 创建文章
                          await createPostItem(data as PostCreateData);
            } catch (error) {
                throw new Error(error as string);
            }
            // 创建或更新文章后跳转到文章详情页
            // 注意,这里不要用push,防止在详情页后退后返回到创建或编辑页面的弹出框
            router.replace(`/posts/${post.id}`);
        },
        [props.type],
    );

    // 定义默认数据
    const defaultValues = useMemo<PostCreateData | PostUpdateData>(() => {
        if (props.type === 'create') {
            return {
                thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
                title: '文章标题',
                body: '文章内容',
            } as PostCreateData;
        }
        return {
            id: props.item.id,
            title: props.item.title,
            body: props.item.body,
            summary: isNil(props.item.summary) ? undefined : props.item.summary,
            keywords: isNil(props.item.keywords) ? undefined : props.item.keywords,
        } as PostUpdateData;
    }, [props.type]);

    // 表单中的数据值获取
    const form = useForm<PostCreateData | PostUpdateData>({
        defaultValues,
    });

    const mdeditorHandlers = useMemo<MarkdownEditorProps['handlers']>(
        () => ({
            onBroswerScreen: props.editorFullScreen,
            onPageScreen: props.editorFullScreen,
        }),
        [props.editorFullScreen],
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandle)} className="tw-space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>文章标题</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入标题" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SEO关键字</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="请输入关键字,用逗号分割(关键字是可选的)"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>关键字之间请用英文逗号(,)分割</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>摘要简述</FormLabel>
                            <FormControl>
                                <Textarea placeholder="摘要是可选的" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>文章内容</FormLabel>
                            <FormControl>
                                <MarkdownEditor
                                    {...field}
                                    content={body}
                                    setContent={setBody}
                                    handlers={mdeditorHandlers}
                                    previewTheme="arknights"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{props.submitText}</Button>
            </form>
        </Form>
    );
};
