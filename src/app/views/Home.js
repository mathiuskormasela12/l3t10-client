import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DataList from '../components/DataList'

function Home() {
	return(
		<div>
			<Header title="Aplikasi CRUD" />
			<Link to="/add" style={{ marginBottom: '20px'}}>Tambah Produk</Link>
			<DataList />
		</div>
	);
}

export default Home;
