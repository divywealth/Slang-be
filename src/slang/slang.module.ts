import { Module } from '@nestjs/common';
import { SlangService } from './slang.service';
import { SlangController } from './slang.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slang, SlangSchema } from './entities/slang.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Code, CodeSchema } from 'src/code/entities/code.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Slang.name, schema: SlangSchema },
      { name: User.name, schema: UserSchema },
      { name: Code.name, schema: CodeSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [SlangController],
  providers: [SlangService, UserService],
})
export class SlangModule {}
