import getClient from "../util/redis.js";

const validAuth = (username: string) => {
    return new Promise<string>((resolve, reject) => {
        getClient()
        .then(async c => {
            const userId = await c.get(username);
            if(!userId) {
                return reject("No Auth");
            };
            resolve(userId);
        })
        .catch(err => reject(err))
    });
};

export default validAuth;