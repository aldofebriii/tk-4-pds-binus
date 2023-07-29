import Kebutuhan, { IKebutuhan } from "../model/kebutuhan.js";
import { IUser } from "../model/user.js";
import rl from "../util/rl.js";

const kebutuhanController = (userId: string) => {
    return new Promise<void>((resolve, reject) => {
        rl.question("Silahkan pilih menu dibawah ini \n 1. Tambahkan Rekomendasi Kebutuhan\n 2. Cari Kebutuhan\n", async (a) => {
            const numA = parseInt(a);
            if(numA !== 1 && numA !== 2) {
                console.log("Invalid Input");
                console.log("===========================");
                reject();
            };
    
            if(numA === 1) {
                rl.question("Silahkan tuliskan nama barang yang ingin anda rekomendasikan \n", (barang) => {
                    const container: Partial<IKebutuhan> = {};
                    container.barang = barang;

                    rl.question("Silahkan tuliskan harga barang yang ingin anda rekomendasikan \n", (harga) => {
                        if(!parseInt(harga)) {
                            console.log("Invalid Input");
                            reject();
                        };
                        container.harga = parseInt(harga);

                        rl.question("Silahkan alasan anda merekomendasikan barang tersebut \n", async (desc) => {
                            container.desc = desc;
                            const kebutuhan = new Kebutuhan({...container, userId: userId});
                            await kebutuhan.save();
                            console.log("Saran Barang berhasil ditambahkan..");
                            resolve();
                        });
                    });
                });
            };

            if(numA === 2) {
                rl.question("Silahkan tuliskan nama barang yang ingin anda rekomendasikan \n", async (qry) => {
                    const kebutuhans = await Kebutuhan.find({barang: {
                        $regex: qry
                    }}).limit(100);

                    if(kebutuhans.length === 0) {
                        console.log("Belum ada barang yang disarankan");
                        return resolve();
                    };

                    console.log("Berikut Informasi  yang dibagikan :");
                    console.log(`Tanggal    |Barang   | Harga      | Alasan     | Author`);
                    for(const k of kebutuhans) {
                        const kU = await k.populate<{userId: IUser}>('userId')
                        const d = new Date(k.createdAt);
                        const tanggal = `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`
                        console.log(`${tanggal}     |${kU.barang}      | ${kU.harga}    | ${kU.desc}    | ${kU.userId.username}`);
                    };  
                    console.log("========================================");
                    resolve();
                })
            };
        })
    });
};
export default kebutuhanController;