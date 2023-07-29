import rl from "../util/rl.js";
import User from "../model/user.js";
import getClient from "../util/redis.js";
const authController = () => {
    return new Promise<string>((resolve, reject) => {
        rl.question("Silahkan masukan username dan password dengan format <username>:<password>\n", async (a) => {
            const splittedAns = a.split(':');
            const [username, password] = splittedAns;
            const user = await User.findOne({username, password});
            if(!user) {
                console.log("Invalid username..");
                reject("");
            } else {
                const client = await getClient();
                await client.set(username, user._id.toString());
                resolve(user.username);
            };
        });
    })
};

export default authController;