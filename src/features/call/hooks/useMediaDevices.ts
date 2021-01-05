import { useState, useEffect } from 'react';

type StreamOrNull = MediaStream | null;

export function useUserMedia(
    constraints = { audio: true, video: true },
    when = true
): [StreamOrNull, () => void, unknown] {
    const [userStream, setUserStream] = useState<StreamOrNull>(null);
    const [error, setError] = useState(false);

    const stop = () => {
        console.log('stop stream');
        if (userStream) {
            console.log('real stop stream');
            userStream.getTracks().forEach((track) => {
                track.stop();
            });

            setUserStream(null);
        }
    };

    const get = async () => {
        console.log('get stream');

        try {
            setUserStream(await navigator.mediaDevices.getUserMedia(constraints));
        } catch (error: any) {
            setError(error);
        }
    };

    useEffect(() => {
        if (when && !userStream) {
            get();
        }

        // if (!when && userStream) {
        //     stop();
        // }

        return () => {
            console.log('stop');
            stop();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [when, constraints]);

    return [userStream, stop, error];
}
