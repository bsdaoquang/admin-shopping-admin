/** @format */

import { HeadComponent } from '@/components';
import { fs } from '@/firebase/firabaseConfig';
import { Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Products = () => {
	const router = useRouter();

	useEffect(() => {
		onSnapshot(collection(fs, 'products'), (snap) => {
			if (snap.empty) {
				console.log('Data not found!');
			} else {
				const items: any[] = [];

				snap.forEach((item: any) => {
					items.push({
						id: item.id,
						...item.data(),
					});
				});

				console.log(items);
			}
		});
	}, []);

	const columns: ColumnProps<any>[] = [
		{
			key: 'title',
			dataIndex: 'title',
		},
	];

	return (
		<div>
			<HeadComponent
				title='Products'
				pageTitle='Products'
				extra={
					<Button
						type='primary'
						onClick={() => router.push('/products/add-new-product')}>
						Add new
					</Button>
				}
			/>
		</div>
	);
};

export default Products;
