import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {
  Armor,
  Skill,
  Weapon,
  Character,
} from '../models';
import {
  ArmorRepository,
  SkillRepository,
  WeaponRepository,
  CharacterRepository,
} from '../repositories';

export class UpdateCharacterController {
  constructor(
    @repository(CharacterRepository)
    public characterRepository : CharacterRepository,

    @repository(ArmorRepository)
    public armorRepository : ArmorRepository,

    @repository(SkillRepository)
    public skillRepository : SkillRepository,

    @repository(WeaponRepository)
    public weaponRepository : WeaponRepository,
  ) {}


  @patch('/updatecharacter/{id}/weapon', {
    responses: {
      '200': {
        description: 'update weapon for character with {id}',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Weapon)
          }
        },
      },
    },
  })
  async updateWeapon(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weapon, {
            exclude: ['id']
          }),
        },
      },
    }) weapon: Omit<Weapon, 'id'>
  ): Promise<Weapon> {
    // equip weapon
    const char = await this.characterRepository.findById(id);
    char.attack! += weapon.attack;
    char.defence! += weapon.defence;

    // unequip the old weapon
    const filter: Filter = {where: {'characterId': id}};
    if ((await this.weaponRepository.find(filter))[0] != undefined) {
      const oldWeapon: Weapon = await this.characterRepository.weapon(id).get();
      char.attack! -= oldWeapon.attack;
      char.defence! -= oldWeapon.defence;
      await this.characterRepository.weapon(id).delete();
    }

    // update changes made to character.
    await this.characterRepository.updateById(id, char);

    return this.characterRepository.weapon(id).create(weapon);
  }
}
