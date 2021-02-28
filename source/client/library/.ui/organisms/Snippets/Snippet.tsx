import React, { FC, useEffect, useState } from 'react';
import Codemirror from '@uiw/react-codemirror';
import { ExternalLink, Save } from 'react-feather';
import { CodeSnippet } from 'types';
import { Button, Tooltip } from '@ui';
import styles from './snippet.scss';

type Props = {
    snippet: CodeSnippet;
    loading?: boolean;
    onSave?: (snippet: CodeSnippet) => void | Promise<void>;
};

const toCompare = (str: string) => JSON.stringify(str.trim());

export const Snippet: FC<Props> = ({ snippet, loading, onSave }) => {
    const [content, setContent] = useState(snippet?.content || '');
    const [contentTouched, setContentTouched] = useState(false);

    useEffect(() => {
        setContentTouched(toCompare(content) !== toCompare(snippet.content));
    }, [content]);

    const handleSave = () => {
        onSave?.({ ...snippet, content });
        setContentTouched(false);
    };

    const controls = (
        <div className={styles.controls}>
            <Tooltip content="Open in editor" className="hoverable">
                <Button rounded background="grey" color="black" size="small" hover>
                    <ExternalLink size="14" />
                </Button>
            </Tooltip>

            {Boolean(onSave) && (contentTouched || loading) && (
                <Tooltip content="Save" className="hoverable ml-xs" onClick={handleSave}>
                    <Button
                        rounded
                        background="grey"
                        color="black"
                        size="small"
                        hover
                        loading={loading}
                    >
                        <Save size="14" />
                    </Button>
                </Tooltip>
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={`${styles.inner} ${loading ? 'disabled' : ''}`}>
                <div className="fill">
                    <Codemirror
                        value={content}
                        onChange={(editor) => setContent(editor.getValue())}
                        options={{
                            mode: snippet.lang,
                            showCursorWhenSelecting: false,
                            lineWrapping: true,
                            lineNumbers: false,
                        }}
                    />
                </div>

                {controls}
            </div>
        </div>
    );
};
