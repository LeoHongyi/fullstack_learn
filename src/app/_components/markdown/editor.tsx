'use client';

import { isNil } from 'lodash';
import { ExposeParam, MdEditor } from 'md-editor-rt';
import { FC, useRef, useState } from 'react';

import { useMount } from 'react-use';

import { MarkdownEditorProps } from './type';

export const MarkdownEditor: FC<MarkdownEditorProps> = (props) => {
    const { content, setContent, handlers = {}, ...rest } = props;
    const ref = useRef<ExposeParam>();
    /**
     * 编辑器在页面级别的全屏状态
     */
    const [pageFullscreen, setPageFullScreen] = useState<boolean>(false);
    /**
     * useMount钩子会在组件挂载(第一次渲染)后执行其内部的函数
     */
    useMount(() => {
        /**
         * 绑定页面全屏事件: pageFullscreen
         * 当编辑器在页面级别的全屏状态改变时,调用setPageFullScreen设置pageFullscreen的值
         * 如果有外部父组件传入的页面全屏函数则继续调用该函数
         */
        ref.current?.on('pageFullscreen', (value) => {
            setPageFullScreen(value);
            if (!isNil(handlers.onPageScreen)) handlers.onPageScreen(value);
        });
        /**
         * 绑定浏览器全屏事件: fullscreen
         * 当编辑器在浏览器级别的全屏状态改变时,把页面级别的全屏状态设置为false(根据上面绑定的pageFullscreen事件,所以同时也会把pageFullscreen设置为false)
         * 如果有外部父组件传入的浏览器全屏函数则继续调用该函数
         */
        ref.current?.on('fullscreen', (value) => {
            ref.current?.togglePageFullscreen(false);
            if (!isNil(handlers.onBroswerScreen)) handlers.onBroswerScreen(value);
        });
    });
    return (
        <MdEditor
            {...rest}
            modelValue={content}
            onChange={setContent}
            pageFullscreen={pageFullscreen}
            ref={ref}
        />
    );
};
