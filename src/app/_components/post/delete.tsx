'use client';

import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';

import { AiOutlineDelete } from 'react-icons/ai';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/app/_components/shadcn/alert-dialog';
import { Button } from '@/app/_components/shadcn/button';

import { deletePostItem } from '@/app/actions/post';

export const PostDelete: FC<{ id: string }> = ({ id }) => {
    const router = useRouter();

    const deleteItem = useCallback(async () => {
        try {
            await deletePostItem(id);
        } catch (e) {
            throw Error(error as any);
        }

        router.refresh();
    }, [id]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <AiOutlineDelete className="tw-mr-2" />
                    删除
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onEscapeKeyDown={(event) => event.preventDefault()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>是否确认删除该文章？</AlertDialogTitle>
                    <AlertDialogDescription>
                        当前不支持软删除，删除文章后将无法恢复
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteItem}>确认</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
