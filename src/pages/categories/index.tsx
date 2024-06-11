/** @format */

import { HeadComponent } from '@/components';
import { AddNewCategory } from '@/modals';
import { Button } from 'antd';
import React, { useState } from 'react';

const Categories = () => {
	const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
		useState(false);

	return (
		<div>
			<HeadComponent
				title='Categories'
				pageTitle='Categories'
				extra={
					<Button
						type='primary'
						onClick={() => setIsVisibleModalAddCategory(true)}>
						Add new
					</Button>
				}
			/>

			<AddNewCategory
				visible={isVisibleModalAddCategory}
				onClose={() => setIsVisibleModalAddCategory(false)}
			/>
		</div>
	);
};

export default Categories;
