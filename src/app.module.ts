import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
// import { UserModule } from './user/user.module';

@Module({
  imports: [MulterModule.register({
    dest: './src/uploads/files',
  }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ranjitha@11',
      database: 'nest_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),AuthModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    console.log('connection status ', connection.isConnected);
  }
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  //   // consumer
  //   //   .apply(LoggerMiddleware)
  //   //   .forRoutes({ path: 'products', method: RequestMethod.GET });
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .exclude({ path: 'products', method: RequestMethod.GET })
  //     .forRoutes(ProductsController);
  // }
}
