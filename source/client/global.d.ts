// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />
declare module '@lls/react-light-calendar';

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly TITLE: string;
        readonly BASE_URL: string;
        readonly MAX_PEERS: string;
    }
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.shared.css' {
    const src: string;
    export default src;
}

declare module '*.shared.scss' {
    const src: string;
    export default src;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
