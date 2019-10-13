import {
  Skill,
  Character,
  SkillRelations,
} from '../models';
import {
  repository,
  BelongsToAccessor,
  DefaultCrudRepository,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {MongoDataSource} from '../datasources';
import {CharacterRepository} from './character.repository';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {
  public readonly character: BelongsToAccessor<
    Character,
    typeof Skill.prototype.id
  >

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('CharacterRepository')
    characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Skill, dataSource);

    this.character = this.createBelongsToAccessorFor(
      'character',
      characterRepositoryGetter
    );

    // Register inclusion Resolver
    this.registerInclusionResolver('character', this.character.inclusionResolver);
  }
}
