import { ClassType, Field, ObjectType } from 'type-graphql';
import { PageInfo } from './page-info';

export const Connection = <TNode>(TNodeClass: ClassType<TNode>) => {
  @ObjectType({ isAbstract: true })
  abstract class Edge {
    @Field()
    cursor: string;

    @Field(() => TNodeClass, {
      nullable: true,
    })
    node?: TNode;
  }

  @ObjectType({ isAbstract: true })
  abstract class Connection {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return Connection;
};
