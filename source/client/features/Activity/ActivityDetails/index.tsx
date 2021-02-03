import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent } from 'types';
import { Block, Button, Color, Colors, Dialog, Event, Input, Textarea } from '@/library/.ui';
import styles from './activity-details.scss';
import { ArrowLeft, ArrowRight, Check, Edit, Edit3 } from 'react-feather';
import { date } from '@/library/utils';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    close: () => void;
};

export const ActivityDetails: FC<Props> = observer(({ isVisible, close, details }) => {
    const [edit, setedit] = useState(false);
    const [titleEdit, settitleEdit] = useState(false);
    const [ratingEdit, setratingEdit] = useState(false);

    if (!details) return null;

    const rating =
        typeof details.rating === 'number' ? `${details.rating} / 10` : `${details.rating}`;

    const title = (
        <>
            {titleEdit ? (
                <div className="flex-col flex-50">
                    <div className="flex-start flex-1">
                        <Input dark onChange={console.log} value={details.title} />

                        <div className="pointer ml-2" onClick={() => settitleEdit(false)}>
                            <Check size="18" />
                        </div>
                    </div>

                    <div className="ml-xs mt-xs">
                        <Colors active={details.color} onChange={console.log} />
                    </div>
                </div>
            ) : (
                <div onClick={() => !titleEdit && settitleEdit(true)}>
                    <Block hover>
                        <div className="flex-start">
                            <Color color={details.color} />

                            <div className="h2 mx-2">{details.title}</div>
                        </div>
                    </Block>
                </div>
            )}
        </>
    );

    const form = () => (
        <div className="flex-col align-end">
            <Input
                dark
                label="Stack"
                onChange={console.log}
                placeholder="react, typescript, mobx, unit-tests"
                value={details.stack}
            />

            <Input
                dark
                label="Salary"
                onChange={console.log}
                placeholder="from 70 000 after taxes"
                value={details.salary}
            />

            <Input
                dark
                label="Contacts"
                onChange={console.log}
                placeholder="https://t.me/someone"
                value={details.contacts}
            />

            <Textarea
                dark
                label="Additional"
                onChange={console.log}
                placeholder="location, work format"
                value={details.additional}
            />

            <div className="flex-end">
                <Button
                    background="success"
                    color="black"
                    onClick={() => setedit(false)}
                    shadow="light"
                    size="small"
                >
                    Update
                </Button>

                <Button
                    background="light"
                    className="ml-1"
                    color="black"
                    onClick={() => setedit(false)}
                    shadow="light"
                    size="small"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );

    return (
        <Dialog
            close={close}
            dark
            isVisible={isVisible}
            size="fullscreen"
            style={{ paddingRight: 60 }}
            title={title}
        >
            <div className={`flex-col ${styles.container}`}>
                <div className="flex mb-xs">
                    <div className="flex-col flex-1 mr-2" onClick={() => !edit && setedit(true)}>
                        <Block controlsInBottom height="315px" hover>
                            {edit ? (
                                form()
                            ) : (
                                <Event details={details} showDate={false} showRating />
                            )}
                        </Block>
                    </div>

                    <div className="flex-col flex-1 ml-2">
                        <div className="flex-col">
                            <Block empty flex height="180px">
                                <div className="h4 text-grey">No snippets was saved</div>
                            </Block>

                            <div className="flex flex-end mt-2 pr-1 disabled">
                                <ArrowLeft className="mr-2" color="white" size="18" />

                                <ArrowRight color="white" size="18" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-between mt-2">
                    {ratingEdit ? (
                        <div className="flex-start flex-50">
                            <Input
                                dark
                                type="number"
                                value={typeof details.rating === 'number' ? details.rating : 0}
                            />

                            <div className="pointer ml-2" onClick={() => setratingEdit(false)}>
                                <Check size="18" />
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => !ratingEdit && setratingEdit(true)}>
                            <Block hover>{rating}</Block>
                        </div>
                    )}

                    <div className="flex-col text-right">
                        <div className="h2">{details.time} min.</div>
                        <div className="h2">{date.when(details.date)}</div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
});
