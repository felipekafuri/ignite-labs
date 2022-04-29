import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreteProductInput {
  @Field()
  title: string;
}
