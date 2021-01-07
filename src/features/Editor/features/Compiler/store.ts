import { API } from './Compiler.api';
import { makeAutoObservable } from 'mobx';
import { languages } from './languages';

class CompilerStore {
    value = '';

    error: string | boolean = false;

    languageInfo: {
        version?: string; // means exist
        code?: string;
    } = {};

    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setValue = (value: string) => {
        this.value = value;
    };

    setError = (error: string) => {
        this.error = error;
    };

    setLoading = (loading = false) => {
        this.loading = loading;
    };

    setLanguageInfo(language: string) {
        if (languages[language]?.version !== this.languageInfo?.version) {
            this.setError('');
            this.setValue('');
        }

        this.languageInfo = languages[language] || {};

        return this.languageInfo;
    }

    compile = (code: string, language: string) => {
        if (!this.languageInfo.version) return;

        this.setError('');
        this.setValue('');

        this.setLoading(true);

        setTimeout(() => {
            API.compile(code, language)
                .then((data) => {
                    if (data.Result) {
                        this.setValue(data.Result);
                    }

                    if (data.Errors) {
                        this.setError(data.Errors);
                    }
                })
                .catch(() => this.setError('unknown error try again later'))
                .finally(this.setLoading);
        }, 400);
    };
}

export default new CompilerStore();
