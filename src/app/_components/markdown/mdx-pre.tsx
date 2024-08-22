import { FC, PropsWithChildren } from 'react';

import { MdxCodeCopy } from './mdx-code-copy';

export const MdxPre: FC<PropsWithChildren & { copyEnabled?: boolean } & Record<string, any>> = ({
    copyEnabled = true,
    children,
    ...rest
}) => {
    return copyEnabled ? (
        <MdxCodeCopy {...rest}>{children}</MdxCodeCopy>
    ) : (
        <pre {...rest}>{children}</pre>
    );
};
