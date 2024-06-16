/** @format */

import { HeadComponent, ImagePicker } from '@/components';
import { fs } from '@/firebase/firabaseConfig';
import { AddNewCategory } from '@/modals';
import { CategoryModel } from '@/models/CategoryModel';
import { HandleFile } from '@/utils/handleFile';
import { Button, Card, Form, Input, Select, Space, message } from 'antd';
import { OptionProps } from 'antd/es/select';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';

const AddNewProduct = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [isVisibleModalAddCategory, setIsVisibleModalAddCategory] =
		useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		getCategories();
	}, []);

	const handleAddNewProduct = async (values: any) => {
		setIsLoading(true);

		const data: any = {};

		for (const i in values) {
			data[`${i}`] = values[i] ?? '';
		}

		try {
			const snap = await addDoc(collection(fs, 'products'), {
				...data,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});

			if (files) {
				HandleFile.HandleFiles(files, snap.id, 'products');
			}
			setIsLoading(false);
			window.history.back();
			form.resetFields();
		} catch (error: any) {
			message.error(error.message);
			setIsLoading(false);
		}
	};

	const getCategories = () => {
		onSnapshot(collection(fs, 'categories'), (snap) => {
			if (snap.empty) {
				console.log('Data not found!');
				setCategories([]);
			} else {
				const items: any[] = [];

				snap.forEach((item: any) => {
					items.push({
						value: item.id,
						label: item.data().title,
					});
				});

				setCategories(items);
			}
		});
	};

	return (
		<div>
			<HeadComponent
				title='Add new product'
				pageTitle='Add new product'
				extra={
					<Button
						type='primary'
						onClick={() => setIsVisibleModalAddCategory(true)}
						icon={<BiAddToQueue size={22} />}>
						Add new category
					</Button>
				}
			/>
			<div className='col-md-8 offset-md-2'>
				<Card title='Form add new'>
					<Form
						disabled={isLoading}
						size='large'
						form={form}
						layout='vertical'
						onFinish={handleAddNewProduct}>
						<Form.Item
							name={'title'}
							label='Title'
							rules={[
								{
									required: true,
									message: 'What is products title',
								},
							]}>
							<Input placeholder='Title' maxLength={150} allowClear />
						</Form.Item>
						<Form.Item name={'type'} label='Type'>
							<Input />
						</Form.Item>
						<Form.Item name={'categories'} label='Categories'>
							<Select mode='multiple' options={categories} />
						</Form.Item>
						<Form.Item name={'description'} label='Description'>
							<Input.TextArea rows={3} />
						</Form.Item>
						<Form.Item name={'price'} label='Price'>
							<Input type='number' />
						</Form.Item>
					</Form>

					{files.length > 0 && (
						<div>
							<img
								src={URL.createObjectURL(files[0])}
								style={{
									width: 200,
									height: 'auto',
								}}
								alt=''
							/>
						</div>
					)}
					<ImagePicker
						loading={isLoading}
						onSelected={(vals) => setFiles(vals)}
					/>

					<div className='mt-3 text-right'>
						<Button
							loading={isLoading}
							onClick={() => form.submit()}
							type='primary'>
							Publish
						</Button>
					</div>
				</Card>
			</div>

			<AddNewCategory
				visible={isVisibleModalAddCategory}
				onClose={() => setIsVisibleModalAddCategory(false)}
			/>
		</div>
	);
};

export default AddNewProduct;
