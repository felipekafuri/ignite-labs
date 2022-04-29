import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { PurchaseResolver } from './graphql/resolvers/purchases.resolver';
import { CustomerService } from 'src/services/customers.service';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Services
    ProductsService,
    PurchasesService,
    CustomerService,
    // Resolvers
    PurchaseResolver,
    ProductResolver,
    CustomerResolver,
  ],
})
export class HttpModule {}
