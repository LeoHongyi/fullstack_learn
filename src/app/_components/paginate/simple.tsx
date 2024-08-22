'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/app/_components/shadcn/pagination';

const SimplePaginate: FC<{ totalPages: number; currentPage: number }> = ({
    totalPages,
    currentPage,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const getPageUrl = useCallback(
        (value: number) => {
            const params = new URLSearchParams(searchParams);
            value <= 1 ? params.delete('page') : params.set('page', value.toString());

            return pathname + (params.toString() ? `?${params.toString()}` : '');
        },
        [searchParams],
    );
    useEffect(() => {
        // 在当前页面小于等于1时，删除URL中的页面查询参数
        const params = new URLSearchParams(searchParams);
        if (currentPage <= 1) params.delete('page');
        router.replace(pathname + (params.toString() ? `?${params.toString()}` : ''));
    }, [currentPage]);
    return totalPages > 1 ? (
        <Pagination className="tw-justify-start">
            <PaginationContent className="tw-w-full tw-justify-between">
                <PaginationItem>
                    <PaginationPrevious
                        className={clsx(
                            'tw-rounded-sm',
                            currentPage <= 1
                                ? 'tw-shadow-gray-50 tw-bg-slate-50/70'
                                : ' tw-bg-white/90 hover:tw-shadow-nylg hover:tw-shadow-white',
                        )}
                        href={getPageUrl(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="访问上一页"
                        text="上一页"
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        className={clsx(
                            'tw-rounded-sm',
                            currentPage >= totalPages
                                ? 'tw-shadow-gray-50 tw-bg-slate-50/70'
                                : ' tw-bg-white/90 hover:tw-shadow-nylg hover:tw-shadow-white',
                        )}
                        href={getPageUrl(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        aria-label="访问下一页"
                        text="下一页"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ) : null;
};
export default SimplePaginate;
