'use client';

import { isNil } from 'lodash';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import { Button } from '../shadcn/button';

export const PostEditButton: FC<{ id: string }> = ({ id }) => {
    const searchParams = useSearchParams();
    const getUrlQuery = useMemo(() => {
        const query = new URLSearchParams(searchParams.toString()).toString();
        return isNil(query) || query.length < 1 ? '' : `?${query}`;
    }, [searchParams]);

    return (
        <Button asChild className="tw-mr-3">
            <Link href={`/post-edit/${id}${getUrlQuery}`}>
                <AiOutlineDelete className="tw-mr-2" />
                编辑
            </Link>
        </Button>
    );
};
