import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SlangModule } from './slang/slang.module';
import { PreslangModule } from './preslang/preslang.module';
import { CodeModule } from './code/code.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthenticationModule,
    UserModule,
    CloudinaryModule,
    SlangModule,
    PreslangModule,
    CodeModule,
    ReactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

