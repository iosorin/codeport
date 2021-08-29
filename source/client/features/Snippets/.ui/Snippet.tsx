import React, { CSSProperties, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Check, Copy, Edit3, Save } from 'react-feather';
import type { Snippet as TSnippet } from 'types';
import { Tooltip, Codemirror, Input } from '@ui';
import { copy, date, isEqual } from '@utils';
import styles from './snippet.scss';
import { EditorOptions, EDITOR_THEME } from '@constants';

type Props = {
	snippet: TSnippet;
	loading?: boolean;
	light?: boolean;
	theme?: EditorOptions['theme'];
	className?: string;
	style?: CSSProperties;
	copyable?: boolean;
	onSave?: (snippet: TSnippet) => void | Promise<void>;
};

export const Snippet: FC<Props> = ({
	snippet,
	loading,
	light,
	theme = light ? 'default' : EDITOR_THEME,
	className = '',
	style,
	copyable: showCopy = true,
	onSave,
}) => {
	const [content, setContent] = useState(snippet.content);
	const [contentTouched, setContentTouched] = useState(false);
	const [isNameEditing, setIsNameEditing] = useState(false);
	const [title, setTitle] = useState(snippet.title || 'Untitled');

	const showSave = Boolean(onSave) && (contentTouched || loading);

	useEffect(() => {
		setContentTouched(!isEqual(content, snippet.content));
	}, [content]);

	const handleSave = () => {
		onSave!({ ...snippet, content });

		setTimeout(() => {
			setContentTouched(false);
		}, 300);
	};

	const handleCopy = () => copy(snippet.content);

	// todo - stay
	const name = (
		<div className={`hover ${styles.name}`}>
			{isNameEditing ? (
				<>
					<Input value={title} inline onChange={(e) => setTitle(e.currentTarget.value)} />
					<Check size='16' className='ml-2 pointer' onClick={() => setIsNameEditing(false)} />
				</>
			) : (
				<span className='text-truncate'>{title} / </span>
			)}

			{date.withoutTime(snippet.date)}

			{isNameEditing ? (
				<Check size='16' className='ml-2 pointer' onClick={() => setIsNameEditing(false)} />
			) : (
				<Edit3
					size='16'
					className='hover-target ml-2 pointer'
					onClick={() => setIsNameEditing(true)}
				/>
			)}
		</div>
	);

	const actions = (
		<div className={styles.actions}>
			{showSave && (
				<Tooltip text='Save' textDone='Saved' className='opacity mr-2' center onClick={handleSave}>
					<Save size='16' />
				</Tooltip>
			)}

			{showCopy && (
				<Tooltip text='Copy' textDone='Copied' className='opacity' center onClick={handleCopy}>
					<Copy size='16' />
				</Tooltip>
			)}
		</div>
	);

	const header = (
		<div className={styles.header}>
			{name}
			{actions}
		</div>
	);

	if (!content) return null;

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
			</div>
		</div>
	);
};
