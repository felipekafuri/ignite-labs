import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { CreteProductInput } from '../inputs/create-product-input';
import { Product } from '../model/product';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productsServices: ProductsService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsServices.listAllProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreteProductInput) {
    const { title } = data;
    return this.productsServices.createProduct({ title });
  }
}
