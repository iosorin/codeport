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

    const handleActionClick = (action: () => void) => {
        setIsVisible(false);
        action();
    };

    return (
        <div
            className={`${isVisible ? '' : 'hoverable'} ${styles.container} ${
                showOnHover ? styles.hover : ''
            }`}
            ref={ref}
        >
            <div className={styles.trigger} onClick={handleTriggerClick}>
                {trigger || <MoreHorizontal size="15" />}
            </div>

            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                {children}

                {onEdit && (
                    <div className={styles.option} onClick={() => handleActionClick(onEdit)}>
                        Edit <Edit size="14" />
                    </div>
                )}
                {onDetails && (
                    <div className={styles.option} onClick={() => handleActionClick(onDetails)}>
                        Details <Eye size="14" />
                    </div>
                )}
                {onDelete && (
                    <div className={styles.option} onClick={() => handleActionClick(onDelete)}>
                        Delete <Trash size="14" />
                    </div>
                )}
            </div>
        </div>
    );
};
