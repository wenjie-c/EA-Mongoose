import '../user.js';
import '../organization.js'
import { model, Schema, Types, Document } from 'mongoose';
import { IUser } from '../user.js';

export interface IWorkStation{
    _id?: string;
    //organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
    userId?: Types.ObjectId | IUser; // Recomendado para que Typescript nos acepte al popularlo
    num: number;
}

const workstationSchema = new Schema<IWorkStation>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    num: {
        type: Number,
        unique: true,
        required: true,
    }
});

export const WorkStationModel = model<IWorkStation>('WorkStation', workstationSchema);