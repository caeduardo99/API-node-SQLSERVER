import sql from 'mssql'

const bdSettings = {
    user : 'fazt',
    password : 'carlos123',
    server : 'localhost',
    database : 'web',
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
