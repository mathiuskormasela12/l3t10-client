import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import productContext from './context/productContext';
import Home from './views/Home';
import Add from './views/Add';
import Edit from './views/Edit';

const { ShowProductProvider, AddProductProvider, EditProductProvider } = productContext;

function Router() {
	return(
		<ShowProductProvider>
			<BrowserRouter>
				<AddProductProvider>
					<EditProductProvider>
						<Route path="/" exact component={ Home } />
						<Route path="/add" component={ Add } />
						<Route path="/edit/:id" component={ Edit } />
					</EditProductProvider>
				</AddProductProvider>
			</BrowserRouter>
		</ShowProductProvider>
	);
}

export default Router;
