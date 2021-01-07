import { API, AllowedLanguage } from './Compiler.api';
import { makeAutoObservable } from 'mobx';

class EditorStore {
    value = 'Compiler';

    error: string | boolean = false;

    info = '';

    constructor() {
        makeAutoObservable(this);
    }

    setValue = (value: string) => {
        this.value = value;
    };

    setInfo = (info: string) => {
        this.info = info;
    };

    setError = (error: string) => {
        this.error = error;
    };

    compile = (code: string, language: AllowedLanguage) => {
        API.compile(code, language)
            .then((data) => {
                if (data.Result) {
                    this.setValue(data.Result);
                }

                if (data.Errors) {
                    this.setError(data.Errors);
                }

                this.setInfo(data.Stats);
            })
            .catch(() => this.setError('unknown error'));
    };
}

export default new EditorStore();
