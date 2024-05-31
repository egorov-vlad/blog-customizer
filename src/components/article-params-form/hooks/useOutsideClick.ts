import React, { useEffect } from 'react';

type UseOutsideClick = {
	ref: React.MutableRefObject<HTMLDivElement | null>;
	onClick: () => void;
};

export function useOutsideClick({ ref, onClick }: UseOutsideClick) {
	function handleClickOutside(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			onClick();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}
