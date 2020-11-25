import { useState, createContext } from 'react';

function productContext() {
	const ShowProductContext = createContext();

	const ShowProductProvider = props => {
		const [state, setState] = useState([]);

		const showProductProps = { state, setState };

		return(
			<ShowProductContext.Provider value={ showProductProps }>
				{ props.children }
			</ShowProductContext.Provider>
		);
	}

	const AddProductContext = createContext();

	const AddProductProvider = props => {
		const [state, setState] = useState({
			namaProduk: '',
			keterangan: '',
			harga: 0,
			jumlah: 0
		});

		const addProductProps = { state, setState };

		return(
			<AddProductContext.Provider value={ addProductProps }>
				{ props.children }
			</AddProductContext.Provider>
		);
	}

	const EditProductContext = createContext();

	const EditProductProvider = props => {
		const [state, setState] = useState({
			namaProduk: '',
			keterangan: '',
			harga: 0,
			jumlah: 0,
			id: ''
		});

		const editProductProps = { state, setState };

		return(
			<EditProductContext.Provider value={ editProductProps }>
				{ props.children }
			</EditProductContext.Provider>
		);
	}

	return {
		ShowProductContext,
		ShowProductProvider,
		AddProductContext,
		AddProductProvider,
		EditProductContext,
		EditProductProvider
	}
}

export default productContext();
