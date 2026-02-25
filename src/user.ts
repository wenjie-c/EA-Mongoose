import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER'; // enum
  organization: Types.ObjectId; // Referència forta a l'altra col·lecció
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // equivalente a PRIMARY KEY en Sql
  role: { type: String, enum: ['ADMIN', 'EDITOR', 'USER'], default: 'USER' },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true } // referencia a la coleccion de Organization, equivalente a FOREIGN KEY en Sql
});

export const UserModel = model<IUser>('User', userSchema);