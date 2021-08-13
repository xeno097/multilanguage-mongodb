import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureModule } from './feature/feature.module';
import { Request, Response } from 'express';
import { ModelModule } from './model/model.module';
import { FuelTypeModule } from './fuel-type/fuel-type.module';
import { CarModule } from './car/car.module';

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
    ModelModule,
    FuelTypeModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
