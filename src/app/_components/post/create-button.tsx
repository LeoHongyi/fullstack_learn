'use client';

import { isNil } from 'lodash';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';

import { IoMdAdd } from 'react-icons/io';

import { Button } from '../shadcn/button';

export const PostCreateButton: FC = () => {
    const searchParams = useSearchParams();
    const getUrlQuery = useMemo(() => {
        const query = new URLSearchParams(searchParams.toString()).toString();
        return isNil(query) || query.length < 1 ? '' : `?${query}`;
    }, [searchParams]);
    return (
        <Button asChild className="tw-justify-end tw-rounded-sm tw-ml-auto" variant="outline">
            <Link href={`/post-create${getUrlQuery}`}>
                <IoMdAdd className="tw-mr-2 " />
                创建
            </Link>
        </Button>
    );
};
