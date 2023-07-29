import rl from './util/rl.js';
import mongoose from 'mongoose';
import kebutuhanController from './controller/kebutuhan.js';
import pengetahuanController from './controller/pengetahuan.js';
import getClient from './util/redis.js';
import authController from './controller/auth.js';
import validAuth from './middleware/validAuth.js';


const main = async () => {
    try {
        const username = await authController();
    
        const menu = () => {
            rl.question('Silahkan pilih menu dibawah ini\n 1. Kebutuhan Petani \n 2. Pengetahuan Petani \n 3. Exit \n', async (a) => {
                if([1,2,3].indexOf(parseInt(a)) === -1) {
                    console.log("Invalid Input");
                    menu();
                };
                const userId = await validAuth(username);
                if(parseInt(a) === 1) {
                    await kebutuhanController(userId);
                    console.log("===========================================================");
                    menu();
                };
        
                if(parseInt(a) === 2) {
                    await pengetahuanController(userId);
                    console.log("===========================================================");
                    menu();
                };
        
                if(parseInt(a) === 3) {
                    console.log("Keluar Applikasi..");
                    rl.close();
                    process.exit();
                };
            });
        };

        menu();
    } catch(err) {
        main();
    };
};

//db connect
mongoose.connect('mongodb://localhost:27017/tk-4-tugas')
.then(async () => {
    console.log("Connected..");
    await getClient();
    main();
})
.catch(err => console.log(err))