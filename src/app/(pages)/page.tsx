import clsx from 'clsx';
import { isNil } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

import { IPaginateQueryProps } from '@/app/_components/paginate/types';
import { queryPostPaginate } from '@/app/actions/post';

import { formatChineseTime } from '@/libs/time';

import { Tools } from '../_components/home/tools';

import { PostDelete } from '../_components/post/delete';

import { PostEditButton } from '../_components/post/edit-button';
import { PostListPaginate } from '../_components/post/pageinate';

import $styles from './page.module.css';

const HomePage: FC<{ searchParams: IPaginateQueryProps }> = async ({ searchParams }) => {
    const { page: currentPage, limit = 8 } = searchParams;
    // 当没有传入当前页或当前页小于1时，设置为第1页
    const page = isNil(currentPage) || Number(currentPage) < 1 ? 1 : Number(currentPage);
    const { items, meta } = await queryPostPaginate({ page: Number(page), limit });
    return (
        <div className={$styles.container}>
            <Tools />
            {page <= meta.totalPages ? (
                <div className={$styles.list}>
                    {items.map((item) => (
                        <div
                            className={$styles.item}
                            // 传入css变量的封面图用于鼠标移动到此处后会出现不同颜色的光晕效果
                            style={{ '--bg-img': `url(${item.thumb})` } as any}
                            key={item.id}
                        >
                            <Link className={$styles.thumb} href={`/posts/${item.id}`}>
                                <Image
                                    src={item.thumb}
                                    alt={item.title}
                                    fill
                                    priority
                                    sizes="100%"
                                />
                            </Link>
                            <div className={$styles.content}>
                                <div className={clsx($styles.title, 'tw-hover')}>
                                    <Link href={`/posts/${item.id}`}>
                                        <h2 className="tw-ellips tw-animate-decoration tw-animate-decoration-lg">
                                            {item.title}
                                        </h2>
                                    </Link>
                                </div>
                                <div className={$styles.summary}>
                                    {isNil(item.summary)
                                        ? item.body.substring(0, 99)
                                        : item.summary}
                                </div>
                                <div className={$styles.footer}>
                                    <div className={$styles.meta}>
                                        <span>
                                            <AiOutlineCalendar />
                                        </span>
                                        <time className="tw-ellips">
                                            {!isNil(item.updatedAt)
                                                ? formatChineseTime(item.updatedAt)
                                                : formatChineseTime(item.createdAt)}
                                        </time>
                                    </div>
                                    <div className={$styles.meta}>
                                        <PostEditButton id={item.id} />
                                        <PostDelete id={item.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={$styles.noData}>
                    你已经超过最底页了，都是404了，请点击LOGO回首页吧
                </div>
            )}
            {meta.totalPages > 1 && <PostListPaginate limit={8} page={page} />}
        </div>
    );
};
export default HomePage;
