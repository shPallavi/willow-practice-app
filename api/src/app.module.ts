import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, BlogsModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
