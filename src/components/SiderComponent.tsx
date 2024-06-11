/** @format */

import { Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BiHome, BiUser } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const SiderComponent = () => {
	const items: MenuItem[] = [
		{
			key: 'home',
			label: <Link href={'/'}>Home</Link>,
			icon: <BiHome />,
		},
		{
			key: 'users',
			label: <Link href={'/users'}>Users</Link>,
			icon: <BiUser />,
		},
		{
			key: 'offers',
			label: <Link href={'/offers'}>Offers</Link>,
			icon: <BiUser />,
		},
		{
			key: 'categories',
			label: <Link href={'/categories'}>Categories</Link>,
			icon: <IoMdPricetag />,
		},
	];

	return (
		<Sider style={{ height: '100vh' }}>
			<Menu items={items} theme='dark' />
		</Sider>
	);
};

export default SiderComponent;
