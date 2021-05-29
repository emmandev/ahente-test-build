import { Document, model, Schema } from 'mongoose';
import { Agent } from '../types/agent';

type AgentDocument = Document & Agent;

const schema = new Schema({
  _id: {
    alias: 'id',
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});

export default model<AgentDocument>('Agent', schema);
