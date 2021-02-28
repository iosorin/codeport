import { makeAutoObservable } from 'mobx';
import { CodeSnippet } from 'types';

export class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    openEditorWithSnippet = (snippet: CodeSnippet) => {
        console.log('snippet', snippet);
    };
}
