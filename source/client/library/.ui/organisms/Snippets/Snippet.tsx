import React, { FC, useEffect, useState } from 'react';
import { Copy, Save } from 'react-feather';
import { CodeSnippet } from 'types';
import { Tooltip, Codemirror } from '@ui';
import styles from './snippet.scss';
import { copy } from '@/library/utils';
import classNames from 'classnames';

type Props = {
    snippet: CodeSnippet;
    loading?: boolean;
    onSave?: (snippet: CodeSnippet) => void | Promise<void>;
};

const toCompare = (str: string) => JSON.stringify(str.trim());

export const Snippet: FC<Props> = ({ snippet, loading, onSave }) => {
    const [content, setContent] = useState(snippet?.content || '');
    const [contentTouched, setContentTouched] = useState(false);

    const showSave = Boolean(onSave) && (contentTouched || loading);

    useEffect(() => {
        setContentTouched(toCompare(content) !== toCompare(snippet.content));
    }, [content]);

    const handleSave = () => {
        onSave?.({ ...snippet, content });
        setContentTouched(false);
    };

    const handleCopy = () => copy(snippet.content);

    const controls = (
        <div className={styles.controls}>
            <Tooltip content="Copy" className="hoverable" onClick={handleCopy}>
                <Copy size="14" />
            </Tooltip>

            {showSave && (
                <Tooltip content="Save" className="hoverable ml-2" onClick={handleSave}>
                    <Save size="14" />
                </Tooltip>
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <div
                className={classNames(styles.inner, {
                    disabled: loading,
                })}
            >
                <div className="fill">
                    <Codemirror
                        value={content}
                        onChange={(editor) => setContent(editor.getValue())}
                        options={{
                            mode: snippet.lang,
                            showCursorWhenSelecting: false,
                            lineNumbers: false,
                        }}
                    />
                </div>

                {controls}
            </div>
        </div>
    );
};
