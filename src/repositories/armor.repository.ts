import {
  Armor,
  Character,
  ArmorRelations,
} from '../models';
import {
  repository,
  BelongsToAccessor,
  DefaultCrudRepository,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {MongoDataSource} from '../datasources';
import {CharacterRepository} from './character.repository';

export class ArmorRepository extends DefaultCrudRepository<
  Armor,
  typeof Armor.prototype.id,
  ArmorRelations
> {
  public readonly character: BelongsToAccessor<
    Character,
    typeof Armor.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('CharacterRepository')
    characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Armor, dataSource);

    this.character = this.createBelongsToAccessorFor(
      'character',
      characterRepositoryGetter
    );

    // Register inclusion Resolver
    this.registerInclusionResolver('character', this.character.inclusionResolver);
  }
}
