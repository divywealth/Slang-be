import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Slang } from 'src/slang/entities/slang.entity';

export type UserDocument = HydratedDocument<User>

export enum STATUS {
  VARIFIED = 'Verified',
  NOTVERIFIED = 'Not Verified'
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false, default: null})
  profilepic: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: STATUS, default: STATUS.NOTVERIFIED})
  status: STATUS;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;

  // @Prop({ default: Date.now })
  // createdAt!: Date;

  // @Prop({ default: Date.now })
  // updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('populatedSlangs', {
  ref: 'Slang',
  localField: '_id',
  foreignField: 'user',
})