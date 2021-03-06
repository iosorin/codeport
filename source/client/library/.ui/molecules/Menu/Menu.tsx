import React, { FC, useState } from 'react';
import { Edit, Eye, MoreHorizontal, Trash } from 'react-feather';
import { useOutsideClick } from '@/library/hooks';
import styles from './menu.scss';

type Props = {
    onEdit?: false | (() => void);
    onDelete?: false | (() => void);
    onDetails?: false | (() => void);
    showOnHover?: boolean;
    trigger?: JSX.Element;
};

export const Menu: FC<Props> = ({
    trigger,
    onEdit,
    onDelete,
    onDetails,
    showOnHover,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref] = useOutsideClick(() => setIsVisible(false));

    const handleTriggerClick = (event: any) => {
        if (showOnHover) return;

        event.stopPropagation();

        setIsVisible(!isVisible);
    };

    const handleClick = (cb: () => void) => {
        setIsVisible(false);
        cb();
    };

    return (
        <div
            ref={ref}
            className={`${isVisible ? '' : 'hoverable'} ${styles.container} ${
                showOnHover ? styles.hover : ''
            }`}
        >
            <div className={styles.trigger} onClick={handleTriggerClick}>
                {trigger || <MoreHorizontal size="15" />}
            </div>

            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                {children}

                {onEdit && (
                    <div className={styles.option} onClick={() => handleClick(onEdit)}>
                        Edit <Edit size="14" />
                    </div>
                )}

                {onDetails && (
                    <div className={styles.option} onClick={() => handleClick(onDetails)}>
                        Details <Eye size="14" />
                    </div>
                )}

                {onDelete && (
                    <div className={styles.option} onClick={() => handleClick(onDelete)}>
                        Delete <Trash size="14" />
                    </div>
                )}
            </div>
        </div>
    );
};
