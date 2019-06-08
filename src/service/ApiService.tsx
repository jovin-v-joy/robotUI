const baseURL = 'http://localhost:8080';
export function get(url: string, params?: any) {
    return fetchApi(baseURL+url,{
        headers: {'Accept': 'application/json', 'Content-type': 'application/json'},        
        method: 'GET',
       // mode: 'no-cors'		
	});
	
}

async function fetchApi(url: string, options: RequestInit) {       
    const data = await fetch(url, options);// .then(parseResponse);
    return data.json();
}

/* async function parseResponse(response: Response) {
	let json: any;
    const headerType = response.headers.get('Content-Type');    
	const csvType = 'text/csv';
	try {
		if (headerType && headerType.split(';').includes(csvType)) {
			json = await response.blob();
		} else {
			json = await response.json();
		}
	} catch (e) {
		json = undefined;
	}

	const status = response.status;
	if (status < 200 || status > 299) {
		const error = json !== undefined && json.error !== undefined ? json.error : response.statusText;

		const errorObject = {
            error,
			status,
			
		};
		throw errorObject;
	} else {
		return json;
	}
}
 */