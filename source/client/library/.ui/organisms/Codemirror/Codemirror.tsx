import React, { FC } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import './styles/index.shared.scss';
import { DEFAULT_EDITOR_OPTIONS, EditorOptions } from '@/library/constants';

type Props = {
    value: string;
    options?: EditorOptions;
    onChange: (editor: CodeMirror.Editor, change: any) => void;
};

export const Codemirror: FC<Props> = ({ value, options = {}, onChange }) => {
    return (
        <div className="fill" style={{ fontSize: options.fontSize }}>
            <ReactCodemirror
                value={value}
                options={{ ...DEFAULT_EDITOR_OPTIONS, ...options }}
                onChange={onChange}
            />
        </div>
    );
};
