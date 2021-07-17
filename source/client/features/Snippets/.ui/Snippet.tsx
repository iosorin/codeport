import React, { CSSProperties, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Copy, Save } from 'react-feather';
import type { Snippet as TSnippet } from 'types';
import { Tooltip, Codemirror } from '@ui';
import { copy, date } from '@utils';
import styles from './snippet.scss';
import { EditorOptions, EDITOR_THEME } from '@constants';

type Props = {
	snippet: TSnippet;
	loading?: boolean;
	light?: boolean;
	theme?: EditorOptions['theme'];
	className?: string;
	style?: CSSProperties;
	onSave?: (snippet: TSnippet) => void | Promise<void>;
};

const toCompare = (str: string) => JSON.stringify(str.trim());

export const Snippet: FC<Props> = ({
	snippet,
	loading,
	light,
	theme = light ? 'default' : EDITOR_THEME,
	className = '',
	style,
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

	const header = (
		<div className={styles.header}>
			{snippet.title || 'Untitled'} / {date.withoutTime(snippet.date)}
		</div>
	);

	const footer = (
		<div className={styles.footer}>
			<Tooltip text='Copy' textDone='Copied' className='opacity' onClick={handleCopy}>
				<Copy size='14' />
			</Tooltip>

			{showSave && (
				<Tooltip text='Save' textDone='Saved' className='opacity ml-2' onClick={handleSave}>
					<Save size='14' />
				</Tooltip>
			)}
		</div>
	);

	return (
		<div
			className={classNames(className, styles.container, { [styles.light]: light })}
			style={style}
		>
			<div className={classNames(styles.inner, { disabled: loading })}>
				{header}

				<Codemirror
					value={content}
					className={styles.editor}
					onChange={(editor) => setContent(editor.getValue())}
					options={{
						mode: snippet.lang,
						showCursorWhenSelecting: false,
						lineNumbers: false,
						theme,
					}}
				/>

				{/* {footer} */}
			</div>
		</div>
	);
};
