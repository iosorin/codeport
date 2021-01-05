import React, { FC } from 'react';
import { BaseLayout } from '@layouts';
import Human from '@resources/media/human.svg';
import { Logo } from '@ui';

export const Landing: FC = () => {
    return (
        <BaseLayout>
            <div className="flex-center flex-column text-center" style={{ height: '100%' }}>
                <Logo />

                <img alt="hero" src={Human} style={{ margin: '15px 0 60px' }} />

                <h2>
                    An online code-editor for interviews,
                    <br /> troubleshooting, teaching & more…
                </h2>
            </div>
        </BaseLayout>
    );
};
