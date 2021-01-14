import { API } from './console.api';
import { makeAutoObservable } from 'mobx';
import { languages } from './languages';

type ContentItem = {
    value: string;
    error?: boolean;
};

class CompilerStore {
    languageInfo: {
        key?: number;
        code?: string;
        version?: string;
    } = {};

    results: ContentItem[] = [];

    script = '';

    loading = false;

    scriptCache = 0; // script exec flag

    get isJS() {
        return this.languageInfo.key === 0;
    }

    get languageIsSupported() {
        return !!this.languageInfo.version || this.isJS;
    }

    constructor() {
        makeAutoObservable(this);
    }

    setResults = (content: ContentItem[]) => {
        this.results = content;
    };

    addResult = (value = '', error = false) => {
        this.setResults([...this.results, { value, error }]);
    };

    setLoading = (loading = false) => {
        this.loading = loading;
    };

    setScript = (script: string) => {
        this.script = script;
    };

    incrScriptCache = () => {
        this.scriptCache += 1;
    };

    setLanguageInfo = (language: string) => {
        if (languages[language]?.version !== this.languageInfo?.version) {
            this.setResults([]);
        }

        this.languageInfo = languages[language] || {};

        return this.languageInfo;
    };

    execute = (code: string, language: string) => {
        if (!this.languageIsSupported) return;

        if (this.isJS) {
            this.setScript(code);
            this.incrScriptCache();
        } else {
            this.setLoading(true);

            setTimeout(() => {
                API.compile(code, language)
                    .then((data) => {
                        if (data.Result) {
                            this.addResult(data.Result);
                        }

                        if (data.Errors) {
                            this.addResult(data.Errors, true);
                        }
                    })
                    .catch(() => this.addResult('unknown error try again later', true))
                    .finally(this.setLoading);
            }, 200);
        }
    };
}

export default new CompilerStore();
