import { FC } from 'react';

import { PostCreateButton } from '../post/create-button';

import { BackButton } from './back-button';

import $styles from './tools.module.css';

export const Tools: FC<{ back?: boolean }> = ({ back }) => (
    <div className={$styles.tools}>
        {back && <BackButton />}
        <PostCreateButton />
    </div>
);
