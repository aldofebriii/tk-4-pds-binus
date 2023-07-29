import { IUser } from "../model/user.js";
import Pengetahuan from "../model/pengetahuan.js";
import rl from "../util/rl.js";

const pengetahuanController = (userId: string) => {
    return new Promise<void>((resolve, reject) => {
        rl.question("Silahkan pilih menu dibawah ini \n 1. Tambahkan Pengetahuan \n 2. Lihat seluruh pengetahun\n", async (a) => {
            const numA = parseInt(a);
            if(numA !== 1 && numA !== 2) {
                console.log("Invalid Input");
                console.log("===========================");
                reject();
            };
    
            if(numA === 1) {
                rl.question("Silahkan tuliskan pengetahuan yang ingin anda bagikan \n", async (a) => {
                    const pengetahuan = new Pengetahuan({
                        data: a,
                        userId: userId
                    });
                    await pengetahuan.save();
                    console.log("Pengetahuan berhasil ditambahkan..");
                    resolve();
                });
            };

            if(numA === 2) {
                console.log("Berikut List Informasi yang dibagikan :");
                const pengetahuans = await Pengetahuan.find({});
                console.log(`Tanggal    |Informasi   | Author`);
                for(const p of pengetahuans) {
                    const pU = await p.populate<{userId: IUser}>('userId')
                    const d = new Date(p.createdAt);
                    const tanggal = `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`
                    console.log(`${tanggal}     |${pU.data}      | ${pU.userId.username}`);
                };  
                console.log("========================================");
                resolve();
            };
        })
    });
};

export default pengetahuanController;