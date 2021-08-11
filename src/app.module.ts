import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureModule } from './feature/feature.module';
import { Request, Response } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: (ctx: { req: Request; res: Response }) => {
        return {
          headers: ctx.req.headers,
        };
      },
    }),
    FeatureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
