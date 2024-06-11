/** @format */

import { ImagePicker } from '@/components';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

type Props = {
	visible: boolean;
	onClose: () => void;
};

const AddNewCategory = (props: Props) => {
	const { visible, onClose } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [title, settitle] = useState('');
	const [files, setFiles] = useState<any[]>([]);

	const handleClose = () => {
		onClose();
	};

	const handleAddNewCategory = async (values: any) => {
		console.log(values);
	};

	return (
		<Modal
			open={visible}
			loading={isLoading}
			onCancel={handleClose}
			title='Add new category'>
			<div className='mb-3 mt-3'>
				<Input
					size='large'
					placeholder='title'
					maxLength={150}
					showCount
					allowClear
				/>
				{files.length > 0 && (
					<div className='mt-4'>
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
			</div>
		</Modal>
	);
};

export default AddNewCategory;
