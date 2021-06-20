import { RefObject, useCallback, useEffect, useRef } from 'react';

type Event = MouseEvent | KeyboardEvent;
type Element = HTMLElement & HTMLDivElement;

export function useOutsideClick<T extends Element>(
	handler: (e: Event) => void
): [RefObject<T>] {
	const ref = useRef<T>(null);

	const memoizedCallback = useCallback(
		(event: Event) => {
			const ignore =
				event instanceof MouseEvent
					? ref.current === event.target ||
					  ref.current?.contains(event.target as Node)
					: event.key !== 'Escape';

			if (ref.current && !ignore) {
				// todo: remove event listener on (ref.current === null)?
				handler(event);
			}
		},
		[ref, handler]
	);

	useEffect(() => {
		document.addEventListener('click', memoizedCallback);
		document.addEventListener('keydown', memoizedCallback);

		return () => {
			document.removeEventListener('click', memoizedCallback);
			document.removeEventListener('keydown', memoizedCallback);
		};
	}, [memoizedCallback]);

	return [ref];
}
