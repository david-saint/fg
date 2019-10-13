import {
  model,
  Entity,
  property,
  belongsTo,
} from '@loopback/repository';
import {Character, CharacterWithRelations} from './character.model';

@model()
export class Skill extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  attack: number;

  @property({
    type: 'number',
    required: true,
  })
  defence: number;


  // Relationships

  @belongsTo(() => Character)
  characterId: string;
 

  constructor(data?: Partial<Skill>) {
    super(data);
  }
}

export interface SkillRelations {
  // describe navigational properties here
  character?: CharacterWithRelations;
}

export type SkillWithRelations = Skill & SkillRelations;
