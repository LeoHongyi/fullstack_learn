import { isNil } from 'lodash';
import Image from 'next/image';
import { FC } from 'react';

import { AiOutlineCalendar } from 'react-icons/ai';

import { Tools } from '@/app/_components/home/tools';

import { MarkdownPreview } from '@/app/_components/markdown/preivew';
import { queryPostItem } from '@/app/actions/post';

import { formatChineseTime } from '@/libs/time';

import $styles from './page.module.css';

const PostItemPage: FC<{ params: { item: string } }> = async ({ params }) => {
    const post = await queryPostItem(params.item);
    return (
        <div className={$styles.container}>
            <Tools back />
            {post.body}
            <div className={$styles.item}>
                <div className={$styles.thumb}>
                    <Image
                        src={post.thumb}
                        alt={post.title}
                        fill
                        priority
                        sizes="100%"
                        unoptimized
                    />
                </div>

                <div className={$styles.content}>
                    <header className={$styles.title}>
                        <h1>{post.title}</h1>
                    </header>
                    <div className={$styles.meta}>
                        <div>
                            <span>
                                <AiOutlineCalendar />
                            </span>
                            <time className="tw-ellips">
                                {!isNil(post.updatedAt)
                                    ? formatChineseTime(post.updatedAt)
                                    : formatChineseTime(post.createdAt)}
                            </time>
                        </div>
                    </div>
                    <div className={$styles.body}>
                        <MarkdownPreview text={post.body} previewTheme="arknights" />
                        {/* <MdxRemoteRender source={post.body} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostItemPage;
