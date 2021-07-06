import React from 'react';
import { Block as BlockComponent } from '.';

export default {
	title: 'Molecules/Block',
	component: BlockComponent,
};

export const Block = (args) => (
	<BlockComponent {...args}>
		<h3>Header</h3>

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, consectetur natus
			maxime magni animi eum dolore sit pariatur atque nihil est! Obcaecati, expedita consequuntur
			laudantium consequatur aliquid ipsa eum, consectetur adipisci iusto molestiae possimus
			perferendis reiciendis rem itaque cum totam minus nam maiores dicta! Quidem obcaecati
			molestiae a sapiente quae?
		</p>
	</BlockComponent>
);
