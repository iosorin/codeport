import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent } from 'types';
import { Block, Colors, Dialog, Event } from '@/library/.ui';
import { ArrowLeft, ArrowRight } from 'react-feather';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    close: () => void;
};

export const ActivityDetails: FC<Props> = observer(({ isVisible, close, details }) => {
    return (
        details && (
            <Dialog
                close={close}
                dark
                isVisible={isVisible}
                size="fullscreen"
                title={details.title}
            >
                <div className={`flex-col`}>
                    <div className="flex my-2">
                        <div className="flex-col flex-1 mr-2">
                            <h4>Rating</h4>
                            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                            <div className="h1">{details.rating} / 10</div>
                        </div>

                        <div className="flex-col flex-1">
                            <h4>Time</h4>

                            <span className="h1">{details.time} min.</span>
                        </div>
                    </div>

                    <div className="flex my-2">
                        <div className="flex-col flex-1 mr-2">
                            <div>
                                <h4>Details</h4>

                                <Event details={details} />
                            </div>
                        </div>

                        <div className="flex-col flex-1">
                            <h4>Snippets</h4>

                            <Block background="dark" empty flex>
                                <div className="h4 text-grey">No snippets was saved</div>
                            </Block>

                            <div className="flex flex-end mt-2 pr-1 disabled">
                                <ArrowLeft className="mr-2" color="white" size="18" />

                                <ArrowRight color="white" size="18" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-col my-2">
                        <h4>Mark</h4>
                        <div className="flex flex-1 mr-2">
                            <Block background="dark" styled>
                                <Colors active={details.color} onChange={console.log} />
                            </Block>
                        </div>
                        <div className="flex-1" />
                    </div>
                </div>
            </Dialog>
        )
    );
});
