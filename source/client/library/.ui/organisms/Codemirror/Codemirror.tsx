import React, { FC } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import 'codemirror/keymap/sublime';
import './styles/index.shared.scss';
import { EDITOR_OPTIONS, EditorOptions, HOTKEYS } from '@/library/constants';

type Props = {
    value: string;
    options?: EditorOptions;
    onChange: (editor: CodeMirror.Editor, change: any) => void;
    onSave?: (selected: string) => void;
    emptySelectionOnSave?: boolean;
};

export const Codemirror: FC<Props> = ({
    value,
    options: optionsProp = {},
    emptySelectionOnSave = false,
    onChange,
    onSave,
}) => {
    const options = {
        ...EDITOR_OPTIONS,
        ...optionsProp,
        extraKeys: {
            [HOTKEYS.EDITOR_SAVE_SNIPPET.key]: (editor: CodeMirror.Editor) => {
                if (!onSave) return;

                let selection = editor.getSelection();

                if (!selection.length && !emptySelectionOnSave) {
                    selection = editor.getValue();
                }

                onSave(selection);
            },
        },
    };

    return (
        <div className="fill" style={{ fontSize: options.fontSize }}>
            <ReactCodemirror value={value} options={options} onChange={onChange} />
        </div>
    );
};
