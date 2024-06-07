/** @format */

import { ImagePicker } from '@/components';
import { fs } from '@/firebase/firabaseConfig';
import { HandleFile } from '@/utils/HandleFile';
import { generatorRandomText } from '@/utils/generatorRadomText';
import { Button, Card, Form, Input } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const AddNewOffer = () => {
	const [files, setFiles] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		const str = generatorRandomText();
		form.setFieldValue('code', str);
	}, []);

	const addNewOffer = async (values: any) => {
		const data: any = {};

		for (const i in values) {
			data[`${i}`] = values[i] ?? '';
		}

		try {
			const snap = await addDoc(collection(fs, 'offers'), data);

			if (files) {
				HandleFile.HandleFiles(files, snap.id);
			}

			form.resetFields();
			window.history.back();
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<div className='col-md-8 offset-md-2'>
			<Card>
				<Form
					disabled={isLoading}
					layout='vertical'
					form={form}
					onFinish={addNewOffer}>
					<Form.Item
						name={'title'}
						label='Title'
						rules={[
							{
								required: true,
								message: 'Please enter title of offer',
							},
						]}>
						<Input placeholder='title' allowClear />
					</Form.Item>
					<Form.Item name={'description'} label='Description'>
						<Input.TextArea rows={2} placeholder='Description' allowClear />
					</Form.Item>
					<Form.Item name={'percent'} label='percent'>
						<Input type='number' placeholder='percent' allowClear />
					</Form.Item>
					<Form.Item name={'code'} label='Code'>
						<Input placeholder='Code' />
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
				<div className='text-right'>
					<Button
						loading={isLoading}
						type='primary'
						onClick={() => form.submit()}>
						Publish
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default AddNewOffer;
