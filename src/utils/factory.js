import { Factory } from 'rosie';
/**
 * FactoryBuilder class contains methods that defines the schema for generating seed data
 */
class FactoryBuilder {
/**
 * Defines the schema for categoryOfservices with some defaults that can be overwritten
 * durring method calls
 * @param { object } data - Data object to overwrite schema defaults.
 * @returns { object } Category of service factory - This exposes the build command for building
 * out data based on the schema and data obeject provided
 */
  static categoryOfServices(data) {
    Factory.define('categoryOfServices')
      .attr('categoryName', 'categoryName')
      .attr('categoryDescription', 'categoryDescription')
      .attr('createdAt', new Date())
      .attr('updatedAt', new Date());
    return Factory.build('categoryOfServices', data);
  }
}

export default FactoryBuilder;
