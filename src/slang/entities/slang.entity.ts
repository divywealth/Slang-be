import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type PreSlangDocument = HydratedDocument<Slang>;

export enum Status {
  APPROVED = 'Approved',
  PENDING = 'Pending',
}
@Schema({ timestamps: true })
export class Slang {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  slang: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ type: String, enum: Status, default: Status.PENDING })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  user: User;
}

export const SlangSchema = SchemaFactory.createForClass(Slang);
