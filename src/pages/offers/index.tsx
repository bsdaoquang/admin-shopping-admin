/** @format */

import { ColumnProps } from 'antd/es/table';
import { Button, Table } from 'antd';

import React, { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { fs } from '@/firebase/firabaseConfig';
import { collectionNames } from '@/constants/collectionNames';
import { useRouter } from 'next/router';

const Offers = () => {
	// const [users, setUsers] = useState<UserModel[]>([]);
	const router = useRouter();

	useEffect(() => {
		onSnapshot(collection(fs, collectionNames.offers), (snap) => {
			if (snap.empty) {
				console.log('Data not found');
			} else {
				const items: any[] = [];

				snap.forEach((item: any) =>
					items.push({
						id: item.id,
						...item.data(),
					})
				);

				console.log(items);
			}
		});
	}, []);

	// const columns: ColumnProps<any>[] = [
	// 	{
	// 		key: 'Name',
	// 		dataIndex: 'displayName',
	// 		title: 'User name',
	// 	},
	// 	{
	// 		key: 'email',
	// 		dataIndex: 'email',
	// 		title: 'Email',
	// 	},
	// 	{
	// 		key: 'createdAt',
	// 		dataIndex: 'creationTime',
	// 		title: 'Sign up',
	// 		render: (val: Date) => new Date(val).toISOString(),
	// 		align: 'center',
	// 	},
	// 	{
	// 		key: 'btn',
	// 		title: '',
	// 		dataIndex: '',
	// 		render: (item: UserModel) => (
	// 			<Space>
	// 				<Button icon={<BiTrash size={20} />} danger type='text' />
	// 			</Space>
	// 		),
	// 		align: 'right',
	// 	},
	// ];

	return (
		<>
			<div className='text-right'>
				<Button
					type='primary'
					onClick={() => router.push('/offers/add-new-offer')}>
					Add new
				</Button>
			</div>
		</>
	);
};

export default Offers;
