'use client';

import { FC, PropsWithChildren } from 'react';

import { PageModalWithEditor } from '@/app/_components/modal/page-modal-with-editor';
import { PostActionForm } from '@/app/_components/post/action-form';

const CreatePostPage: FC<PropsWithChildren> = () => (
    <PageModalWithEditor
        title="创建文章"
        match={['/post-create']}
        render={({ editorFullScreen }) => (
            <PostActionForm type="create" submitText="保存" editorFullScreen={editorFullScreen} />
        )}
    />
);

export default CreatePostPage;
