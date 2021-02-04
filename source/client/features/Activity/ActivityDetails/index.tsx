import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CompletedScheduleEvent, ScheduleEvent } from 'types';
import { Button, Dialog } from '@/library/.ui';
import { Details } from './Details';
import { Snippets } from './Snippets';

type Props = {
    isVisible: boolean;
    details: CompletedScheduleEvent | null;
    setDetails: (details: ScheduleEvent) => void;
    close: () => void;
};

export const ActivityDetails: FC<Props> = observer(({ isVisible, close, details, setDetails }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'snippets'>('details');

    return (
        details && (
            <Dialog close={close} isVisible={isVisible} size="large" style={{ minHeight: '75vh' }}>
                <div className="tabs">
                    <Button onClick={() => setActiveTab('details')}>Details</Button>
                    <Button onClick={() => setActiveTab('snippets')}>Snippets</Button>
                </div>

                {activeTab === 'details' && <Details details={details} setDetails={setDetails} />}
                {activeTab === 'snippets' && <Snippets />}
            </Dialog>
        )
    );
});
