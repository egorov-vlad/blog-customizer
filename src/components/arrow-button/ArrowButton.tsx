import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (isFormOpen: boolean) => void;

export type ArrowButtonProps = {
	onClick: OnClick;
	isFormOpen: boolean;
};

export const ArrowButton = ({ onClick, isFormOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={() => {
				onClick(!isFormOpen);
			}}
			className={clsx(styles.container, {
				[styles.container_open]: isFormOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isFormOpen,
				})}
			/>
		</div>
	);
};
