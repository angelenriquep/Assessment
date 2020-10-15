export const getTime = async () => {
    try {

        const resp = await fetch('http://localhost:8000/time', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'mysecrettoken'
            }
        });

        return resp.json();

    }catch (err){
        throw err;
    }
}

export const getMetrics = async () => {
    try {

        const resp = await fetch('http://localhost:8000/metrics', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'mysecrettoken'
            }
        });

        const body = await resp.text()

        return body

    }catch (err){
        throw err;
    }
}