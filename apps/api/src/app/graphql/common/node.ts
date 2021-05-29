import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType({ autoRegisterImplementations: false })
export abstract class Node {
  @Field(() => ID)
  id: string;
}
