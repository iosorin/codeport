import React, { FC, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Button } from '@ui';
import styles from './carousel.scss';

type Props = {
    children: JSX.Element[];
    navigation?: 'arrows' | 'dots';
    align?: 'start' | 'center' | 'end';
};
type Item = {
    id: number;
    child: JSX.Element;
};

export const Carousel: FC<Props> = ({ children, navigation = 'dots', align = 'end' }) => {
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

        const { length } = items;
        const last = length - 1;

        if (direction === 'forward') {
            setCurrentIndex((index) => (index === last ? 0 : index + 1));

            return;
        }

        setCurrentIndex((index) => (index === 0 ? last : index - 1));
    };

    const renderArrows = () => {
        return (
            <div className="flex-start">
                <Button
                    rounded
                    background="grey"
                    color="black"
                    size="small"
                    hover
                    onClick={() => move('backward')}
                >
                    <ChevronLeft className="hoverable" size="17" />
                </Button>

                <Button
                    rounded
                    background="grey"
                    color="black"
                    size="small"
                    hover
                    className="ml-xs"
                    onClick={() => move('forward')}
                >
                    <ChevronRight className="hoverable" size="17" />
                </Button>
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

            <div className={styles.navigation}>
                {navigation === 'arrows' ? renderArrows() : renderDots()}
            </div>
        </div>
    );
};
