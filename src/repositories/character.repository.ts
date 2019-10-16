import {
  Armor,
  Skill,
  Weapon,
  Character,
  CharacterRelations,
} from '../models';
import {
  repository,
  DefaultCrudRepository,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {MongoDataSource} from '../datasources';
import {ArmorRepository} from './armor.repository';
import {SkillRepository} from './skill.repository';
import {WeaponRepository} from './weapon.repository';

export class CharacterRepository extends DefaultCrudRepository<
  Character,
  typeof Character.prototype.id,
  CharacterRelations
> {

  public readonly armor: HasOneRepositoryFactory<Armor, typeof Character.prototype.id>;
  public readonly skill: HasOneRepositoryFactory<Skill, typeof Character.prototype.id>;
  public readonly weapon: HasOneRepositoryFactory<Weapon, typeof Character.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('ArmorRepository') protected armorRepositoryGetter: Getter<ArmorRepository>,
    @repository.getter('SkillRepository') protected skillRepositoryGetter: Getter<SkillRepository>,
    @repository.getter('WeaponRepository') protected weaponRepositoryGetter: Getter<WeaponRepository>,
  ) {
    super(Character, dataSource);
    this.armor = this.createHasOneRepositoryFactoryFor('armor', armorRepositoryGetter,);
    this.skill = this.createHasOneRepositoryFactoryFor('skill', skillRepositoryGetter,);
    this.weapon = this.createHasOneRepositoryFactoryFor('weapon', weaponRepositoryGetter,);
  }
}
