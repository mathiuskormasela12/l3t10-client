import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productContext from '../context/productContext';
import http from '../http';
import styled from '../style/datalist.module.scss';

const { ShowProductContext } = productContext;

function DataList() {
	const props = useContext(ShowProductContext);
	const [isLoading, setLoading] = useState(true);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');
	const [isRefresh, setRefresh] = useState(0);

	useEffect(() => {
		async function handleProduct() {
			try {
				const results = await http('get', '/produk', null);
				setType(results.type);
				setMessage(results.message);
				props.setState(results.results);
				setLoading(false);
			} catch(err) {
				setType(err.type);
				setMessage(err.message);
				props.setState([]);				
				setLoading(false);			
			}
		}
		handleProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRefresh]);

	const handleDelete = async (id, e) => {
		e.preventDefault();
		try {
			const response = await http('delete', '/produk/' + id, null);
			setType(response.type);
			setMessage(response.message);		
			setRefresh(num => (++num));
		} catch(err) {
			setType(err.type);
			setMessage(err.message);
			setRefresh(num => (++num));
		}
	}
	
	return(
		<main>
			{ isLoading ? (
				<p>Loading...</p>
			): null}
			<p className={ styled[type] }>{ message }</p>			
			{ message.length > 0 && props.state.length > 0 ? (
				<div>
					<table border="1" cellPadding="10" cellSpacing="0" style={{ width: '60%'}}>
						<thead>
							<tr>
								<th>No.</th>
								<th>Nama Produk</th>
								<th>Keterangan</th>
								<th>Harga</th>
								<th>Jumlah</th>
								<th>Aksi</th>
						</tr>
						</thead>
						<tbody>
							{ props.state.map((item, index) => (
								<tr key={ index }>
									<td>{ index + 1}.</td>
									<td style={ { textTransform: 'capitalize'} }>{ item.nama_produk }</td>
									<td style={ { textTransform: 'capitalize'} }>{ item.keterangan }</td>
									<td>Rp. { item.harga }</td>
									<td>{ item.jumlah } buah</td>
									<td>
										<Link to={ `/edit/${item._id}` }>Edit</Link> |
										<Link to='/' onClick={ e => handleDelete(item._id, e) }>Hapus</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			): null }
		</main>
	);
}

export default DataList;
