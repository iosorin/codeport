import React, { FC, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Button } from '@ui';
import styles from './carousel.scss';

type Props = {
    children: JSX.Element[];
    navigation?: 'arrows' | 'dots' | 'disabled';
    navigationDisabled?: boolean;
    align?: 'start' | 'center' | 'end';
};
type Item = {
    id: number;
    child: JSX.Element;
};

export const Carousel: FC<Props> = ({
    children,
    navigation = 'dots',
    navigationDisabled,
    align = 'end',
}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setItems(
            children.map((child, id) => {
                return {
                    id,
                    child,
                };
            })
        );
    }, []);

    if (!items.length) return null;

    const move = (direction: 'forward' | 'backward' | false, stepIndex?: number) => {
        if (stepIndex) {
            setCurrentIndex(stepIndex);
            return;
        }

        const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

        setCurrentIndex(nextIndex);
    };

    const renderArrows = () => {
        return (
            <div className={styles.arrows}>
                <div className={`${currentIndex === 0 ? 'disabled' : ''}`}>
                    <ChevronLeft className="hoverable" size="17" onClick={() => move('backward')} />
                </div>

                <div className={`ml-1 ${currentIndex === items.length - 1 ? 'disabled' : ''}`}>
                    <ChevronRight className="hoverable" size="17" onClick={() => move('forward')} />
                </div>
            </div>
        );
    };

    const renderDots = () => {
        return (
            <ul className="flex-start">
                {items.map((child) => (
                    <li
                        className={`${styles.dot} ${
                            currentIndex === child.id ? styles.activeDot : ''
                        }`}
                        key={child.id}
                        onClick={() => move(false, child.id)}
                    />
                ))}
            </ul>
        );
    };

    const renderItems = () => {
        return items.map((child) => {
            return (
                <div
                    className={`${styles.item} ${currentIndex === child.id ? styles.active : ''}`}
                    key={child.id}
                >
                    {child.child}
                </div>
            );
        });
    };

    return (
        <div className={`${styles.container} align-${align}`}>
            <div className={styles.items}>{renderItems()}</div>

            <div className={`${styles.navigation} ${navigationDisabled ? 'disabled' : ''}`}>
                {navigation === 'arrows' ? renderArrows() : renderDots()}
            </div>
        </div>
    );
};
