/** @format */

import { HeadComponent } from '@/components';
import AvatarComponent from '@/components/AvatarComponent';
import { fs } from '@/firebase/firabaseConfig';
import { AddNewCategory } from '@/modals';
import { CategoryModel } from '@/models/CategoryModel';
import { Button, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Categories = () => {
	const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
		useState(false);
	const [categories, setCategories] = useState<CategoryModel[]>([]);

	useEffect(() => {
		onSnapshot(collection(fs, 'categories'), (snap) => {
			if (snap.empty) {
				console.log('Data not found!');
				setCategories([]);
			} else {
				const items: CategoryModel[] = [];

				snap.forEach((item: any) => {
					items.push({
						id: item.id,
						...item.data(),
					});
				});

				setCategories(items);
			}
		});
	}, []);

	const columns: ColumnProps<CategoryModel>[] = [
		{
			key: 'img',
			dataIndex: '',
			render: (item: CategoryModel) =>
				item.files &&
				item.files.length > 0 && (
					<AvatarComponent id={item.files[0]} path='files' />
				),
		},
		{
			key: 'title',
			dataIndex: 'title',
		},
	];

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
			<Table dataSource={categories} columns={columns} />
			<AddNewCategory
				visible={isVisibleModalAddCategory}
				onClose={() => setIsVisibleModalAddCategory(false)}
			/>
		</div>
	);
};

export default Categories;
