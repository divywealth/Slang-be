import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type PreSlangDocument = HydratedDocument<Preslang>

@Schema()
export class Preslang {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: string;

  @Prop({ required: true })
  slang: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
}
