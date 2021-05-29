import { MercuriusContext } from 'mercurius';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Connection } from './common/connection';
import { Node } from './common/node';
import { AgentRepository } from '../repositories/agent';

@ObjectType({ implements: Node })
export class Agent extends Node {
  @Field()
  name: string;
}

@ObjectType()
class AgentConnection extends Connection(Agent) {}

@InputType()
class CreateAgentInput implements Partial<Agent> {
  @Field()
  name: string;
}

@InputType()
class UpdateAgentInput implements Partial<Agent> {
  @Field({ nullable: true })
  name?: string;
}

@Resolver()
export class AgentResolver {
  @Mutation(() => Boolean)
  async createAgent(
    @Arg('input') input: CreateAgentInput,
    @Ctx() _ctx: MercuriusContext
  ): Promise<boolean> {
    await AgentRepository.create(input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAgent(
    @Arg('id') id: string,
    @Ctx() _ctx: MercuriusContext
  ): Promise<boolean> {
    await AgentRepository.delete({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async updateAgent(
    @Arg('id') id: string,
    @Arg('input') input: UpdateAgentInput,
    @Ctx() ctx: MercuriusContext
  ): Promise<boolean> {
    await AgentRepository.update({ id, ...input });
    return true;
  }

  @Query(() => Agent, { nullable: true })
  async agent(@Arg('id') id: string) {
    return AgentRepository.findById({ id });
  }

  @Query(() => AgentConnection)
  async agents(): Promise<AgentConnection> {
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
