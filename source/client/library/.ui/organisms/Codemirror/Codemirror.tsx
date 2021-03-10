import React, { FC } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import './styles/index.scss';

export type Options = CodeMirror.EditorConfiguration & {
    fontSize?: number;
    autoCloseTags?: boolean;
    autoCloseBrackets?: boolean;
    theme?:
        | 'codeport'
        | 'default'
        | 'darcula'
        | 'dracula'
        | 'shadowfox'
        | 'ayu'
        | 'monokai'
        | 'material';
};
const defaultOptions: Options = {
    mode: 'javascript',
    theme: 'default',
    fontSize: 18,
    tabSize: 4,
    indentUnit: 4,
    indentWithTabs: true,
    lineNumbers: true,
    lineWrapping: true,
    keyMap: 'sublime',
    smartIndent: true,
    autoCloseTags: true,
    autofocus: true,
    autoCloseBrackets: true,
    autocorrect: true,
    autocapitalize: true,
};

type Props = {
    value: string;
    options?: Options;
    onChange: (editor: CodeMirror.Editor, change: any) => void;
};

export const Codemirror: FC<Props> = ({ value, options = defaultOptions, onChange }) => {
    return (
        <div className="fill" style={{ fontSize: options.fontSize }}>
            <ReactCodemirror value={value} options={options} onChange={onChange} />;
        </div>
    );
};
