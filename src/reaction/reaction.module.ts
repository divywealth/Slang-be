import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './entities/reaction.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Slang, SlangSchema } from 'src/slang/entities/slang.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SlangService } from 'src/slang/slang.service';
import { UserService } from 'src/user/user.service';
import { Code, CodeSchema } from 'src/code/entities/code.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reaction.name, schema: ReactionSchema },
      { name: User.name, schema: UserSchema },
      { name: Slang.name, schema: SlangSchema},
      { name: Code.name, schema: CodeSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN}
    })
  ],
  controllers: [ReactionController],
  providers: [ReactionService, UserService, SlangService],
})
export class ReactionModule {}
