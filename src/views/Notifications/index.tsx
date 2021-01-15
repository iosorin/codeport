import React, { FC } from 'react';
import { BaseLayout } from '@layouts';
import { Block } from '@ui';
import { Link } from 'react-router-dom';

export const Notifications: FC = () => {
    return (
        <BaseLayout>
            <h1>Notifications</h1>

            <div className="list list-vertical list-scroll scrollable">
                <Block
                    icon="🚀"
                    small="Jun 4 2020 at 5:35 am"
                    title="Hurray! The project has been launched"
                >
                    <p>
                        All basic information about project goals and usage tips you can find{' '}
                        <Link to="/activity">here</Link>
                    </p>
                </Block>

                <Block
                    icon="👨‍🚀"
                    small="Jun 4 2020 at 5:35 am"
                    title="You have successfully logged via github"
                >
                    <p>
                        Go to <Link to="/activity">profile settings</Link>
                    </p>
                </Block>

                <Block
                    icon="💃"
                    small="Start date - Jun 4 2020 at 5:35 am"
                    title='"Citymax" conference starts in 45 minutes'
                >
                    <Link to="/activity">View details</Link>
                </Block>
            </div>
        </BaseLayout>
    );
};
