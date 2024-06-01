import React, { useEffect } from 'react';

type UseOutsideClick = {
	ref: React.MutableRefObject<HTMLDivElement | null>;
	isOpen: boolean;
	onClick: () => void;
};

export function useOutsideClick({ ref, isOpen, onClick }: UseOutsideClick) {
	function handleClickOutside(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			onClick();
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [ref, isOpen]);
}
