import type {NextApiRequest, NextApiResponse}
from 'next'
import {db, seedData} from '../../database'
import {EntryModel} from '../../models/EntryModel'

type seedData = {
    message: string
}

  export default async function handler(req : NextApiRequest, res : NextApiResponse < seedData >) {

    if (process.env.NODE_ENV === 'production') {
        return res
            .status(401)
            .json({message: 'No tiene accseso a este servicio'})

    }

   await db.connect();
   await EntryModel.deleteMany();
   await EntryModel.insertMany(seedData.entries);
   await db.disconnect();

    console.log('Desde Procesos', process.env.MONGO_URI);

    res
        .status(200)
        .json({message: 'Proceso realizado correctamente'})

}
