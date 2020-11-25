import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import productContext from '../context/productContext';
import styled from '../style/form.module.scss';
import http from '../http';

const { EditProductContext } = productContext;

function FormEdit(prop) {
	
	const history = useHistory();
	const props = useContext(EditProductContext);
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');
	const [isLoad, setLoad] = useState(true);

	const handleInput = (field, e) => {
		props.setState(state => ({
			...state,
			[field]: e.target.value
		}));
	}

	useEffect(() => {
		async function handleReq() {
			try {
				const response = await http('get', '/produk/' + prop.id, null);
				props.setState({
					...props.state,
					namaProduk: response.results.nama_produk,
					keterangan: response.results.keterangan,
					harga: response.results.harga,
					jumlah: response.results.jumlah,
					id: response.results._id
				});
				setLoad(false);
			} catch(err) {
				setType(err.type);
				setMessage(err.message);
			}
		}
		handleReq();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await http('put', '/produk', JSON.stringify({ 
				namaProduk: props.state.namaProduk, 
				keterangan: props.state.keterangan, 
				harga: props.state.harga, 
				jumlah: props.state.jumlah,
				id: props.state.id
			}));
			setType(response.type);
			setMessage(response.message);		
			props.setState({
				namaProduk: '',
				keterangan: '',
				harga: 0,
				jumlah: 0,
				id: '',
			})
			setTimeout(() => {
				history.push('/');
			}, 800)
		} catch(err) {
			setType(err.type);
			setMessage(err.message);		
		}
	}

	return(
		<form method="post" className={ styled.form } onSubmit={ handleSubmit }>
			<Link to="/">Kembali ke Home</Link>
			{ message.length > 0 ? (<p style={{ marginLeft: '40px'}} className={ styled[type]}>{ message }</p>): null }
			{ isLoad ? (<p>loading....</p>) : (
				<ul>
					<li>
						<label htmlFor="namaProduk">Nama Produk</label>
					</li>
					<li>
						<input type="text" placeholder="Nama Produk" id="namaProduk" value={ props.state.namaProduk }  onChange={ e => handleInput('namaProduk', e) } />
						<input type="hidden" value={ props.state.id } onChange={ e => handleInput('id', e) } />
					</li>
					<li>
						<label htmlFor="keterangan">Keterangan</label>
					</li>
					<li>
						<input type="text" placeholder="Keterangan" id="keterangan" value={ props.state.keterangan } onChange={ e => handleInput('keterangan', e) } />
					</li>
					<li>
						<label htmlFor="harga">Harga</label>
					</li>
					<li>
						<input type="number" placeholder="Harga" id="harga" value={ props.state.harga }  onChange={ e => handleInput('harga', e) } />
					</li>
					<li>
						<label htmlFor="jumlah">Jumlah</label>
					</li>
					<li>
						<input type="number" placeholder="Jumlah" id="jumlah" value={ props.state.jumlah }  onChange={ e => handleInput('jumlah', e) } />
					</li>
					<li>
						<button type="submit">Submit</button>
					</li>
				</ul>
			)}
		</form>
	);
}

export default FormEdit;
