import React from 'react';
import Header from '../components/Header';
import FormEdit from '../components/FormEdit';

function Edit(props) {
	return(
		<div>
			<Header title="Tambah Produk Baru"/>
			<FormEdit id={ props.match.params.id }/>
		</div>
	);
}

export default Edit;
