import React, { FC } from 'react';
import { Button, Dialog } from '@ui';

type Props = {
	visible: boolean;
	close: () => void;
};

export const LimitDialog: FC<Props> = ({ visible, close }) => {
	return (
		<Dialog
			centered
			closeIcon={false}
			close={close}
			visible={visible}
			persistent
			title='Oops...'
			transition='slide-in-left'
		>
			<div className='flex-col'>
				<h3>
					This conference room has reached <br />
					the maximum number of participants
				</h3>

				<div className='my-1' style={{ fontSize: 80 }}>
					<span aria-label='caller image' role='img'>
						😬
					</span>
				</div>

				<div className='flex-center mt-2'>
					<div className='slide-in-elliptic'>
						<Button onClick={close}>Got it</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
