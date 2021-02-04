import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Dialog, Tabs, Button } from '@/library/.ui';
import { Details } from './Details';
import { Snippets } from './Snippets';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const DetailsDialog: FC<Props> = observer(({ isVisible, close, details, setDetails }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'snippets'>('details');

    return (
        details && (
            <Dialog close={close} isVisible={isVisible} size="large" style={{ minHeight: '75vh' }}>
                {activeTab === 'details' && <Details details={details} setDetails={setDetails} />}
                {activeTab === 'snippets' && <Snippets />}

                <div className="flex-col mt-auto">
                    <hr />

                    <div className="ml-auto">
                        <Tabs
                            list={['details', 'snippets']}
                            active={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>
                </div>
            </Dialog>
        )
    );
});
