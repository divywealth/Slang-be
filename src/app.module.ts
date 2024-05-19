import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ``
    }),
    AuthenticationModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

