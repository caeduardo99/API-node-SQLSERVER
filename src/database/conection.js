import sql from 'mssql'
import config   from '../config'

const bdSettings = {
    user : config.USER,
    password : 'Ishida7410',
    server : '192.168.1.16',
    database : 'CONSGYP2022',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
};

export async function getConnection(){
    try {
        const pool = await sql.connect(bdSettings)
        return pool
    } catch (error){
        console.error(error)
    }
}

export {sql};
