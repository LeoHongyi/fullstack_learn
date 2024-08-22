/* eslint-disable import/order */
import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import './styles/index.css';

export const metadata: Metadata = {
    title: 'nextapp',
    description: '3r教室Next.js全栈开发课程',
};

const RootLayout: FC<PropsWithChildren<object>> = ({ children }) => (
    <html lang="en">
        <body>{children}</body>
    </html>
);

export default RootLayout;
