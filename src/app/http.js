export default function http(method, path, data) {
	return fetch(`http://127.0.0.1:5000/api${path}`, {
		method: method.toUpperCase(),
		headers: {
			"Content-Type": "application/json"
		},
		body: data
	})
	.then(response => {
		if(!response.ok) {
			const err = new Error('client error');
			err.type = 'danger';
			throw err;
		} else {
			return response.json();
		}
	})
	.then(response => {
		if(response.type !== 'success') {
			const err = new Error(response.message);
			err.type = response.type;
			throw err;
		} else {
			return response;
		}
	})
}
