'use client';

import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';

import { isFullscreen } from '@/libs/broswer';

import { PageModal } from './page-modal';
import { PageModalWithEditorProps } from './type';

export const PageModalWithEditor: FC<PageModalWithEditorProps> = ({
    render: Render,
    className,
    ...rest
}) => {
    const [fullscreen, setFullScreen] = useState<boolean>(false);
    const fullscreenHandler = useCallback((value: boolean) => {
        setFullScreen(isFullscreen() || value);
    }, []);
    const fullscreenClassName = useMemo(
        () => (fullscreen ? '!tw-max-w-[100%] sm:!tw-max-w-[100%] tw-h-full' : ''),
        [fullscreen],
    );
    return (
        <PageModal {...rest} className={clsx(className, fullscreenClassName)}>
            <Render editorFullScreen={fullscreenHandler} />
        </PageModal>
    );
};
