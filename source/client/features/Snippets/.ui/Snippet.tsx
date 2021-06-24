import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Copy, Save } from 'react-feather';
import type { Snippet as TSnippet } from 'types';
import { Tooltip, Codemirror } from '@ui';
import { copy } from '@/library/utils';
import styles from './snippet.scss';
import { EditorOptions, EDITOR_THEME } from '@/library/constants';

type Props = {
	snippet: TSnippet;
	loading?: boolean;
	theme?: EditorOptions['theme'];
	onSave?: (snippet: TSnippet) => void | Promise<void>;
};

const toCompare = (str: string) => JSON.stringify(str.trim());

export const Snippet: FC<Props> = ({
	snippet,
	loading,
	theme = EDITOR_THEME,
	onSave,
}) => {
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
			<Tooltip
				text='Copy'
				textDone='Copied'
				className='opacity'
				onClick={handleCopy}
			>
				<Copy size='14' />
			</Tooltip>

			{showSave && (
				<Tooltip
					text='Save'
					textDone='Saved'
					className='opacity ml-2'
					onClick={handleSave}
				>
					<Save size='14' />
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
				<div className='fill'>
					<Codemirror
						value={content}
						onChange={(editor) => setContent(editor.getValue())}
						options={{
							mode: snippet.lang,
							showCursorWhenSelecting: false,
							lineNumbers: false,
							theme,
						}}
					/>
				</div>

				{controls}
			</div>
		</div>
	);
};
