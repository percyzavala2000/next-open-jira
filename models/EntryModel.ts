import mongoose, {Model, model, Schema} from 'mongoose'
import {EntryInterface} from '../interfaces/entryInterface';

export interface IEntry extends EntryInterface {}

export const EntrySchema = new Schema({

    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number
    },
    status: {
        type: String,
        enum: {
            values: [
                'pending', 'in-progress', 'finished'
            ],
            message: '{VALUE} no es un estado valido'
        }
    }

});

export const EntryModel : Model < IEntry > = mongoose.models.Entry || model('Entry', EntrySchema);

