import React, { FC } from 'react';
import Codemirror from '@uiw/react-codemirror';
import { Edit, Edit2, Edit3, ExternalLink } from 'react-feather';
import { CodeSnippet } from 'types';
import { Button, Tooltip } from '@ui';
import styles from './snippet.scss';

type Props = {
    snippet: CodeSnippet;
};

export const Snippet: FC<Props> = ({ snippet }) => {
    const controls = (
        <div className={styles.controls}>
            <Tooltip content="Open in editor" className="hoverable">
                <Button rounded background="grey" color="black" size="small" hover>
                    <ExternalLink size="14" />
                </Button>
            </Tooltip>

            <Tooltip content="Edit" className="hoverable ml-xs">
                <Button rounded background="grey" color="black" size="small" hover>
                    <Edit size="14" />
                </Button>
            </Tooltip>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className="fill">
                    <Codemirror
                        options={{
                            mode: snippet.lang,
                            readOnly: true,
                            showCursorWhenSelecting: false,
                            lineWrapping: true,
                            lineNumbers: false,
                        }}
                        value={snippet.content}
                    />
                </div>

                {controls}
            </div>
        </div>
    );
};
