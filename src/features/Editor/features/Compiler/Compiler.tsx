import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import store from './store';
import styles from './compiler.scss';

type Props = {
    roomID?: string;
    className?: string;
    isVisible?: boolean;
};

export const Compiler: FC<Props> = observer(({ isVisible, className = '' }) => {
    const classlist = [styles.Compiler, className];

    if (!isVisible) classlist.push(styles.hidden);

    return (
        <div className={classlist.join(' ')}>
            <div>{store.value}</div>
        </div>
    );
});
