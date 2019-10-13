import {
  Weapon,
  Character,
  WeaponRelations
} from '../models';
import {
  repository,
  BelongsToAccessor,
  DefaultCrudRepository,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {MongoDataSource} from '../datasources';
import {CharacterRepository} from './character.repository';

export class WeaponRepository extends DefaultCrudRepository<
  Weapon,
  typeof Weapon.prototype.id,
  WeaponRelations
> {
  public readonly character: BelongsToAccessor<
    Character,
    typeof Weapon.prototype.id
  >

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('CharacterRepository')
    protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Weapon, dataSource);

    this.character = this.createBelongsToAccessorFor(
      'character',
      characterRepositoryGetter
    );

    // Register inclusion resolvers.
    this.registerInclusionResolver('character', this.character.inclusionResolver);
  }
}
