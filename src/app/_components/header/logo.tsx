// src/app/_components/header/logo.tsx
import Image from 'next/image';
import Link from 'next/link';

import Avatar from './avatar.png';

import $styles from './logo.module.css';

export const HeaderLogo = () => (
    <Link href="/" className={$styles.link}>
        <Image
            src={Avatar}
            alt="avatar logo"
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
        />
    </Link>
);
