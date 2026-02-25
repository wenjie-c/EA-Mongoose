import mongoose, {Document, Types} from 'mongoose';
import './WorkStation.js';
import { IWorkStation, WorkStationModel } from './WorkStation.js';

//const mongoose = require('mongoose');
import cnx from '../connection.js' // aunque seria mejor hacer por inyeccion de dependencias
import { UserModel } from '../user.js';
import { OrganizationModel } from '../organization.js';

// Create
export async function Create(userId: string, num: number){
    const ws = new WorkStationModel({
        userId: userId,
        num: num
    });

    return await ws.save();

}

// Read
export async function GetById(id: string) {
    return await WorkStationModel.findById({_id: id}).populate('userId');
}

export async function GetByUserId(userId:string) {
    return await WorkStationModel.find({userId: userId });
}

// Update
export async function Update(id: string, changedData: IWorkStation)
{
    const res = await WorkStationModel.findByIdAndUpdate(id, changedData);
    return res;
}

// Delete
export async function Delete(id: string) {
    const res = await WorkStationModel.findByIdAndDelete(id);
    return res;
}

export async function ListAll(){ 
    const res = await WorkStationModel.find().populate('userId').lean();
    return res;
}

// El retorno de las funciones que no retornan void son de tipo mongoose.LeanDocument<IUser & Required<{
//     _id: string;
// }>> | null

export async function Close() {
    await cnx.disconnect();
    console.log("Disconnecting drom MongoDB");
}
export async function Clear() {
    await UserModel.deleteMany({});
    await OrganizationModel.deleteMany({});
    await WorkStationModel.deleteMany({});
    console.log("Cleaning everything to have a clear start...");
}