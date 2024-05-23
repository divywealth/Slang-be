import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Code, CodeSchema } from 'src/code/entities/code.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
      { name: Code.name, schema: CodeSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
