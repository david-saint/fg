import {Armor, ArmorWithRelations} from './armor.model';
import {Skill, SkillWithRelations} from './skill.model';
import {Weapon, WeaponWithRelations} from './weapon.model';
import {
  model,
  Entity,
  hasOne,
  property,
} from '@loopback/repository';

@model()
export class Character extends Entity {
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
    default: 1,
  })
  level?: number;

  @property({
    type: 'number',
    default: 100,
  })
  nextLevelExp?: number;

  @property({
    type: 'number',
    default: 0,
  })
  currentExp?: number;

  @property({
    type: 'number',
    default: 100,
  })
  maxHealth?: number;

  @property({
    type: 'number',
    default: 100,
  })
  currentHealth?: number;

  @property({
    type: 'number',
    default: 50,
  })
  maxMana?: number;

  @property({
    type: 'number',
    default: 50,
  })
  currentMana?: number;

  @property({
    type: 'number',
    default: 20,
  })
  attack?: number;

  @property({
    type: 'number',
    default: 5,
  })
  defence?: number;

  @property({
    type: 'string'
  })
  slug?: string;


  // Relationships

  @hasOne(() => Armor)
  armor: Armor;

  @hasOne(() => Skill)
  skill: Skill;

  @hasOne(() => Weapon)
  weapon: Weapon;


  constructor(data?: Partial<Character>) {
    super(data);
  }
}

export interface CharacterRelations {
  // describe navigational properties here
}

export type CharacterWithRelations = Character & CharacterRelations;
