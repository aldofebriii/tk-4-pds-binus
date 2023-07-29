import { createClient} from 'redis';

const getClient = async () => {
    let client;
    if(!client) {
        client = createClient();
        client.on('error', (err) => console.log(err));
        await client.connect();
    };

    return client;
};



export default getClient;

