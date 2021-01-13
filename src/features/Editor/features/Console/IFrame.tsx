import React, { FC, SyntheticEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    title: string;
    script?: string;
    onLoad?: (e: SyntheticEvent<HTMLIFrameElement>) => void;
    onResult: (e: string) => void;
    onError: (e: string) => void;
    scriptCache: any;
    className?: string;
};
export const IFrame: FC<Props> = ({
    children,
    script,
    title,
    onLoad,
    onResult,
    onError,
    scriptCache,
    className,
}) => {
    const el = useRef<HTMLIFrameElement | null>(null);

    const win = el.current?.contentWindow;
    const body = win?.document?.body;

    useEffect(() => {
        if (!win) return;

        // @ts-ignore
        win.console = {
            log: (...args: any[]) => {
                const result: string[] = [];

                args.forEach((arg) => {
                    if (typeof arg === 'object') {
                        result.push(JSON.stringify(arg, null, 4));
                    } else {
                        result.push(`${arg}`);
                    }
                });

                onResult(result.join(',  '));
            },
            error: (error: any) => {
                // eslint-disable-next-line no-console
                onError(error);
            },
        };
    }, [onError, onResult, win]);

    useEffect(() => {
        if (!script || !win || !body) return;

        try {
            // @ts-ignore
            win.eval(script);
        } catch (error) {
            // eslint-disable-next-line no-console
            onError(error.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scriptCache]);

    return (
        <iframe ref={el} className={className || ''} onLoad={onLoad} title={title}>
            {body && createPortal(children, body)}
        </iframe>
    );
};
