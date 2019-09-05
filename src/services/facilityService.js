import db from '../models';

const {
  Facility, AmenityFacility, Room, sequelize
} = db;
/**
 * FacilityService class, interface for CompanyModel
 */
export default class FacilityService {
  /**
   * Adds a facility instance along with its corresponding rooms and amenties into the database
   * @static
   * @param {object} facility - Facility object.
   * @param {array} roomsArray - Array of rooms.
   * @param {array} amenitiesArray - Array of amenities.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof FacilityService
   */
  static async createFacility(facility, roomsArray, amenitiesArray) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { dataValues: facilityRecord } = await Facility.create(facility, { transaction: t });
        const { id: facilityId } = facilityRecord;
        const rooms = roomsArray.map((room) => ({ ...room, facilityId }));
        await Room.bulkCreate(rooms, { transaction: t });
        const amenities = amenitiesArray.map((amenityId) => ({ facilityId, amenityId }));
        await AmenityFacility.bulkCreate(amenities, { transaction: t });
        const options = { where: { id: facilityId }, include: [rooms, amenities] };
        return Facility.findOne(options, { transaction: t });
      });
      return result;
    } catch (err) {
      return new Error('failed to create facility');
    }
  }
}
