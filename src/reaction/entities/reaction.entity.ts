import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Slang } from "src/slang/entities/slang.entity";
import { User } from "src/user/entities/user.entity";

export type ReactionSchema = HydratedDocument<Reaction>;

export enum React {
    LIKE = 'Like',
    DISLIKE = 'Dislike'
}

@Schema({ timestamps: true})
export class Reaction {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true})
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    user: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Slang', required: true})
    slang: Slang

    @Prop({ type: String, enum: React, required: true})
    react: React
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction)
