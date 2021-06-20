import React, { FC } from 'react';

type Props = {
	color: string;
	width?: string | number;
};

export const ColorLine: FC<Props> = ({
	color: backgroundColor,
	width = 12,
}) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				height: '100%',
				width,
				backgroundColor,
			}}
		/>
	);
};
