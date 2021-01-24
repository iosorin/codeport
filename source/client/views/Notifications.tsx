import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'react-feather';
import { BaseLayout } from '@layouts';
import { Block, Button } from '@ui';

export const NotificationsView: FC = () => {
    return (
        <BaseLayout>
            <h1>Notifications</h1>

            <>
                <div className="grid grid-y scrollable" style={{ width: '45%' }}>
                    <Block
                        icon="🚀"
                        size="small"
                        small="Jun 4 2020 at 5:35 am"
                        styled
                        title="Hurray! The project has been launched"
                    >
                        <p>
                            All basic information about project goals and usage tips you can find{' '}
                            <Link to="/activity">here</Link>
                        </p>
                    </Block>

                    <Block
                        icon="💃"
                        size="small"
                        small="Jun 4 2020 at 5:35 am"
                        styled
                        title="You have successfully logged via github"
                    >
                        <p>
                            Go to <Link to="/activity">profile settings</Link>
                        </p>
                    </Block>

                    <Block
                        background="primary"
                        icon="👨‍🚀"
                        size="small"
                        small="Start date - Jun 4 2020 at 5:35 am"
                        styled
                        title='"Citymax" conference starts in 45 minutes'
                    >
                        <Link to="/activity">View details</Link>
                    </Block>
                </div>

                <Button
                    background="light"
                    className="mt-auto ml-auto flex-auto"
                    rounded
                    size="large"
                >
                    <Info size="35" />
                </Button>
            </>
        </BaseLayout>
    );
};
