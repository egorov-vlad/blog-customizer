import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onArticlesSubmit: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onArticlesSubmit,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<ArticleStateType>(articleState);

	const toggleArrowButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const onChangeSelectedItem = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setOptions((prev) => ({ ...prev, [key]: option }));
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onArticlesSubmit(options);
	};

	const onReset = () => {
		setOptions(defaultArticleState);
		onArticlesSubmit(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleArrowButtonClick} isFormOpen={isFormOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text weight={800} size={31} align={'left'} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							onChangeSelectedItem('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={'font-size'}
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							onChangeSelectedItem('fontSizeOption', option)
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={options.fontColor}
						options={fontColors}
						onChange={(option) => onChangeSelectedItem('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={options.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							onChangeSelectedItem('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						selected={options.contentWidth}
						options={contentWidthArr}
						onChange={(option) => onChangeSelectedItem('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
