// src/app/_components/home/back-button.tsx

'use client';

import clsx from 'clsx';

import { useRouter } from 'next/navigation';

import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';

import { Button } from '../shadcn/button';
// ...

export const BackButton: FC = () => {
    const router = useRouter();
    const [historyLength, setHistoryLength] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHistoryLength(window.history.length);
        }
    }, []);
    const goBack: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (historyLength > 2) router.back();
        },
        [historyLength],
    );

    return (
        <Button
            variant="outline"
            className={clsx('tw-rounded-sm', {
                'tw-pointer-events-none tw-opacity-50': historyLength <= 1,
            })}
            disabled={historyLength <= 2}
            aria-disabled={historyLength <= 2}
            onClick={goBack}
        >
            <TiArrowBack className="tw-mr-2" />
            返回
        </Button>
    );
};
