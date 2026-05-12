import { faker } from '@faker-js/faker';

export class UniqueGenerator {

  static getUniqueName() : string{
    return faker.person.firstName();
  }

  static getUniqueEmail() : string{
    return faker.internet.email();
  }
}