import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Color, Dialog, Tabs } from '@/library/.ui';
import { Details } from './Details';
import { Snippets } from './Snippets';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const DetailsDialog: FC<Props> = observer(({ isVisible, close, details, setDetails }) => {
    const [activeTab, setActiveTab] = useState<'Details' | 'Snippets'>('Details');

    const title = details && (
        <div className="flex-start">
            <Color color={details.color} />

            <div className="h3 mx-1">{details.title}</div>
        </div>
    );

    return (
        details && (
            <Dialog
                close={close}
                isVisible={isVisible}
                size="large"
                style={{ minHeight: '80vh' }}
                dark
                title={title}
            >
                <div className="flex-col mb-2">
                    <Tabs
                        bordered
                        list={['Details', 'Snippets']}
                        active={activeTab}
                        align="left"
                        onChange={setActiveTab}
                    />
                </div>

                {activeTab === 'Details' && <Details details={details} setDetails={setDetails} />}

                {activeTab === 'Snippets' && (
                    <Snippets
                        snippets={details.snippets}
                        setSnippets={(snippets) => setDetails({ snippets })}
                    />
                )}
            </Dialog>
        )
    );
});
