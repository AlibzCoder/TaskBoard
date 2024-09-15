import { DBCredentials } from "../consts";
import { connect, Mongoose } from "mongoose";


const InitDB = () : Promise<Mongoose> => {
    const {ADMIN_DB_NAME, APP_DB_NAME, HOST_NAME, USERNAME, PASSWORD} = DBCredentials

    return new Promise(async (res, rej)=>{
        try{
            const Client = await connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOST_NAME}/${ADMIN_DB_NAME}`);
            Client.connection.useDb(APP_DB_NAME)
            res(Client)
        }catch(e){
            console.log('Unable To Connect To Database',e);
            rej(e)
        }
    })
}

export default InitDB