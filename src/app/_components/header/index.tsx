// src/app/_components/header/index.tsx
import { FC } from 'react';

import { HeaderLogo } from './logo';
import $styles from './styles.module.css';

export const Header: FC = () => (
    <header className={$styles.header}>
        <HeaderLogo />
    </header>
);
