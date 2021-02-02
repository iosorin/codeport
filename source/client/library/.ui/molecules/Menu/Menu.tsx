import React, { FC, useState } from 'react';
import { Edit, Eye, MoreHorizontal, Trash } from 'react-feather';
import { useOutsideClick } from '@/library/hooks';
import styles from './menu.scss';

type Props = {
    onEdit?: false | (() => void);
    onDelete?: false | (() => void);
    onDetails?: false | (() => void);
};

export const Menu: FC<Props> = ({ onEdit, onDelete, onDetails, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref] = useOutsideClick(() => setIsVisible(false));

    const handle = (action: () => void) => {
        setIsVisible(false);
        action();
    };

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.trigger} onClick={() => setIsVisible(!isVisible)}>
                <MoreHorizontal size="15" />
            </div>

            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                {children}

                {onEdit && (
                    <div className={styles.option} onClick={() => handle(onEdit)}>
                        Edit <Edit size="14" />
                    </div>
                )}
                {onDetails && (
                    <div className={styles.option} onClick={() => handle(onDetails)}>
                        Details <Eye size="14" />
                    </div>
                )}
                {onDelete && (
                    <div className={styles.option} onClick={() => handle(onDelete)}>
                        Delete <Trash size="14" />
                    </div>
                )}
            </div>
        </div>
    );
};
