import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { EntryModel } from '../../../models';
import { IEntry } from '../../../models/EntryModel';

type Data = | {message: string } | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
const {entryid}=req.query;
if(!mongoose.isValidObjectId(entryid)){
    return res.status(400).json({message:'Id no valido'})
    
}
    switch (req.method) {
        case 'GET':
            return getEntries(req,res);
        case 'PUT':
            return updateEntries(req, res);   
        default:
            return res.status(405).json({ message: 'Method not exist' }) 

}   

}
const getEntries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {entryid}=req.query;
    await db.connect();
    const entry=await EntryModel.findById(entryid);
    if(!entry){
        return res.status(404).json({message:'No existe el id'})
    }
    await db.disconnect();
    return res.status(200).json(entry);

}

const updateEntries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {entryid}=req.query;
    await db.connect();
    const entryUpdate=await EntryModel.findById(entryid);
    if(!entryUpdate){
        await db.disconnect();
        return res.status(404).json({message:'No se encontro el id :'+ entryid})
    }

    const {description=entryUpdate.description,status=entryUpdate.status}=req.body;


    try {
        const entry = await EntryModel.findByIdAndUpdate(entryid,{description,status},{runValidators:true,new:true});
        await db.disconnect();
        return res.status(200).json(entry!);
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({message:'Algo salio mal revisar en la consola del servidor'})
    }
}