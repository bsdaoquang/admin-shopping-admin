/** @format */

import { HeadComponent } from '@/components';
import { fs } from '@/firebase/firabaseConfig';
import { Button, Card, Form, Input, Select, message } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

const AddNewProduct = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();
	const optionsSize = [
		{
			label: 'S',
			value: 'S',
		},
		{
			label: 'L',
			value: 'L',
		},
		{
			label: 'M',
			value: 'M',
		},
		{
			label: 'XL',
			value: 'XL',
		},
		{
			label: 'XXL',
			value: 'XXL',
		},
	];

	const handleAddNewProduct = async (values: any) => {
		setIsLoading(true);

		const data: any = {};

		for (const i in values) {
			data[`${i}`] = values[i] ?? '';
		}

		try {
			await addDoc(collection(fs, 'products'), data);

			setIsLoading(false);
			window.history.back();
			form.resetFields();
		} catch (error: any) {
			message.error(error.message);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<HeadComponent title='Add new product' pageTitle='Add new product' />
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
						<Form.Item name={'description'} label='Description'>
							<Input.TextArea rows={3} />
						</Form.Item>
						{/* 
						<div className='row'>
							<div className='col'>
								<Form.Item name={'color'} label='Color'>
									<Input />
								</Form.Item>
							</div>
							<div className='col'>
								<Form.Item name={'size'} label='Size'>
									<Select
										mode='multiple'
										allowClear
										options={optionsSize}
										onChange={(val) => console.log(val)}
									/>
								</Form.Item>
							</div>
							<div className='col'>
								<Form.Item name={'quality'} label='Quality'>
									<Input type='number' />
								</Form.Item>
							</div>
							<div className='col'>
								<Form.Item name={'price'} label='Price'>
									<Input type='number' />
								</Form.Item>
							</div>

						</div>
						// image
						*/}
					</Form>

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
		</div>
	);
};

export default AddNewProduct;
