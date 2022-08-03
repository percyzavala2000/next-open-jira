
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { EntryModel,IEntry } from '../../../models';


type Data = |{message: string }
| IEntry[]
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
                return postEntries(req, res)    
     
        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }


}

const getEntries = async(res: NextApiResponse<Data>) => {

    try {
         await db.connect()
        const entries = await EntryModel.find().sort({ createdAt: "ascending" })
        await db.disconnect()
        return res.status(200).json( entries )
    } catch (error) {
        return res.status(400).json({ message: 'Internal server error' })
    }
}

    const postEntries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

        const {  description="" } = req.body
        const newEntry =new EntryModel( {
            description,
            createdAt: Date.now(),
        });

            try {
                await db.connect()
                await newEntry.save()
                await db.disconnect()
                return res.status(201).json( newEntry )
            } catch (error) {
                return res.status(400).json({ message: 'Internal server error' })
            }
    }