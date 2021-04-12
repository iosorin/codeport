import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '@ui/layouts';
import { Block } from '@ui';

export const ResourcesView: FC = () => {
    return (
        <BaseLayout>
            <h1>Essential Resources</h1>

            <div>
                <h2>Frontend</h2>
                <div className="grid grid-50">
                    <Block
                        background="yellow"
                        icon="#exercises"
                        size="large"
                        title="Exercism. Typescript track"
                    >
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
                            consectetur. <br />
                            <Link to="/activity">Link</Link>
                        </p>
                    </Block>

                    <Block
                        background="yellow"
                        icon="#exercises"
                        size="large"
                        title="Build your own X"
                    >
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
                            consectetur. <br />
                            <Link to="/activity">Link</Link>
                        </p>
                    </Block>

                    <Block
                        background="yellow"
                        icon="#exercises"
                        size="large"
                        title="Top 10 exercises from tech interview"
                    >
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
                            consectetur. <br />
                            <Link to="/activity">Link</Link>
                        </p>
                    </Block>

                    <Block
                        background="yellow"
                        icon="#exercises"
                        size="large"
                        title="Build your own X"
                    >
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
                            consectetur. <br />
                            <Link to="/activity">Link</Link>
                        </p>
                    </Block>
                </div>
            </div>
        </BaseLayout>
    );
};
