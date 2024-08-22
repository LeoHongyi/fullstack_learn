import { FC, PropsWithChildren, ReactNode } from 'react';

import { Header } from '../_components/header';

import $styles from './layout.module.css';

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <>
        <div className={$styles.app}>
            <Header />
            {children}
        </div>
        {modal}
    </>
);
export default AppLayout;
