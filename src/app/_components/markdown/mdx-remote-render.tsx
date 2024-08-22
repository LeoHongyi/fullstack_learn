import { MDXRemoteProps, MDXRemote } from 'next-mdx-remote/rsc';
import { FC } from 'react';
import rehypePrism from 'rehype-prism-plus';

import { deepMerge } from '@/libs/utils';

import { MdxPre } from './mdx-pre';

const defaultMdxOptions: Omit<MDXRemoteProps, 'source'> = {
    options: {
        mdxOptions: {
            rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
        },
    },
    components: {
        pre: MdxPre,
    },
};

export const MdxRemoteRender: FC<MDXRemoteProps> = (props) => {
    return <MDXRemote {...(deepMerge(defaultMdxOptions, props, 'merge') as MDXRemoteProps)} />;
};
