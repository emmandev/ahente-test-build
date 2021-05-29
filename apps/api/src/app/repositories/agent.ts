import { v4 } from 'uuid';
import AgentModel from '../models/agent';
import { Agent } from '../types/agent';

export class AgentRepository {
  static async create(input: Pick<Agent, 'name'>) {
    await AgentModel.create({
      _id: v4(),
      ...input,
    });
  }

  static async delete(params: Pick<Agent, 'id'>) {
    await AgentModel.findByIdAndDelete(params.id);
  }

  static async findById(params: Pick<Agent, 'id'>) {
    return AgentModel.findById(params.id);
  }

  static async update(params: Pick<Agent, 'id'> & Partial<Omit<Agent, 'id'>>) {
    await AgentModel.findByIdAndUpdate(params.id, params);
  }
}
