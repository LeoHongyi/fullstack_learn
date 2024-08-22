'use client';

import { Post } from '@prisma/client';
import { isNil } from 'lodash';
import { FC, useState } from 'react';

import { useMount } from 'react-use';

import { PageModalWithEditor } from '@/app/_components/modal/page-modal-with-editor';
import { PostActionForm } from '@/app/_components/post/action-form';
import { queryPostItem } from '@/app/actions/post';

const PostEdit: FC<{ params: { item: string } }> = ({ params: { item } }) => {
    const [post, setPost] = useState<Post>();

    useMount(() => {
        (async () => {
            setPost(await queryPostItem(item));
        })();
    });

    return (
        <PageModalWithEditor
            title="编辑文章"
            match={['/post-edit/*']}
            render={({ editorFullScreen }) =>
                !isNil(post) && (
                    <PostActionForm
                        type="update"
                        submitText="更新"
                        item={post}
                        editorFullScreen={editorFullScreen}
                    />
                )
            }
        />
    );
};
export default PostEdit;
