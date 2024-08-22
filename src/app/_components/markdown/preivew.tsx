'use client';

import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';

import { FC } from 'react';

import { MarkdownPreviewProps } from './type';

export const MarkdownPreview: FC<MarkdownPreviewProps> = (props) => {
    const { editorId = 'markdown-preview-editor', previewTheme = 'default', text } = props;
    return <MdPreview editorId={editorId} modelValue={text} previewTheme={previewTheme} />;
};
