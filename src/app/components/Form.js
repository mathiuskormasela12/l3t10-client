import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import productContext from '../context/productContext';
import styled from '../style/form.module.scss';
import http from '../http';

const { AddProductContext } = productContext;

function Form() {
	
	const history = useHistory();
	const props = useContext(AddProductContext);
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');

	const handleInput = (field, e) => {
		props.setState(state => ({
			...state,
			[field]: e.target.value
		}));
	}

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await http('post', '/produk', JSON.stringify({ 
				namaProduk: props.state.namaProduk, 
				keterangan: props.state.keterangan, 
				harga: props.state.harga, 
				jumlah: props.state.jumlah 
			}));
			setType(response.type);
			setMessage(response.message);		
			props.setState({
				namaProduk: '',
				keterangan: '',
				harga: 0,
				jumlah: 0
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
			<ul>
				<li>
					<label htmlFor="namaProduk">Nama Produk</label>
				</li>
				<li>
					<input type="text" placeholder="Nama Produk" id="namaProduk" value={ props.state.namaProduk }  onChange={ e => handleInput('namaProduk', e) } />
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
		</form>
	);
}

export default Form;
