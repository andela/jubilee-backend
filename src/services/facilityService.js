import db from '../models';
import { Helpers, ApiError } from '../utils';


const {
  Facility, sequelize, RoomCategory, Room, AmenityFacility, Amenity
} = db;
const { updateCollection } = Helpers;

/**
 * A collection of methods that handles the database interactions
 * for managing a Facility as an entity of the App.
 *
 * @class FacilityService
 */
class FacilityService {
  /**
   * Fetches a facility instance based on it's primary key.
   * @static
   * @param {integer} facilityId - Primary key of the facility to be fetched.
   * @param {object} options - Additional query information
   * @returns {Promise<array>} - An instance of Facility table including it's relationships.
   * @memberof FacilityService
   */
  static async findFacilityById(facilityId, options = {}) {
    return Facility.findByPk(facilityId, options);
  }

  /**
   * Checks the room category value and creates a new record for any category added
   * by user.
   * @static
   * @param {array} rooms - An array of rooms of a specific facility.
   * @returns {Promise<Array>} A promise object with updated room properties.
   * @memberof FacilityService
   */
  static async sortRoomCategory(rooms) {
    const updatedRooms = rooms.map(async (room) => {
      const { dataValues: { label } } = await RoomCategory.findByPk(room.roomCategoryId);
      if (label === 'Others') {
        const { id } = await RoomCategory.create({ description: ' ', label: room.newCategory });
        room.roomCategoryId = id;
      }
      return room;
    });
    return Promise.all(updatedRooms);
  }

  /**
   * Creates an array of amenities for a specific facility.
   * @static
   * @param {object} amenities - Facility data to be recorded in the database.
   * @param {number} id - Facility id.
   * @returns {array}  An array of facility amenities.
   * @memberof FacilityService
   */
  static sortFacilityAmenities(amenities, id) {
    return amenities ? amenities.map((item) => ({ amenityId: item, facilityId: id })) : [];
  }

  /**
   * Fetches a list of amenities returning an array of their labels.
   * @static
   * @param {array} amenityIds - Facility data to be recorded in the database.
   * @returns {Promise<array>}  An array of facility amenities.
   * @memberof FacilityService
   */
  static async findAmenitiesByIds(amenityIds) {
    const amenityLabels = await Amenity.findAll({ where: { id: amenityIds }, attributes: ['label'] });
    return amenityLabels.map(({ dataValues: { label } }) => label);
  }


  /**
   * Creates a facility record in the database.
   * @static
   * @param {object} facilityInfo - Facility data to be recorded in the database.
   * @returns {Promise<object>} A promise object with facility detail.
   * @memberof FacilityService
   */
  static async createFacility(facilityInfo) {
    const { amenities } = facilityInfo;
    try {
      const rooms = await FacilityService.sortRoomCategory(facilityInfo.rooms);
      const result = await sequelize.transaction(async () => {
        const { id: facilityId } = await Facility.create(facilityInfo);
        const updatedRooms = await updateCollection(rooms, { facilityId });
        const facilityAmenities = FacilityService.sortFacilityAmenities(amenities, facilityId);
        await AmenityFacility.bulkCreate(facilityAmenities);
        await Room.bulkCreate(updatedRooms);
        const options = { include: ['rooms', 'amenities'] };
        const facility = await FacilityService.findFacilityById(facilityId, options);
        return facility;
      });
      return result;
    } catch (err) {
      throw new Error('Failed to create facility. Try again');
    }
  }

  /**
   * Updates the room category status.
   * @static
   * @param {number} roomId - Facility data to be recorded in the database.
   * @param {string} roomStatus - status of availability.
   * @returns {Promise<object>} A promise object with facility detail.
   * @memberof FacilityService
   */
  static async roomStatusUpdate(roomId, roomStatus) {
    const [rowaffected, [room]] = await Room.update({ roomStatus },
      { returning: true, where: { id: roomId } });
    if (!rowaffected) throw new ApiError(404, 'Room category not found');
    return room;
  }

  /**
   * updates amenities
   * @static
   * @param {array} amenities - status of availability.
   * @param {number} facilityId - facility id.
   * @returns {Promise<object>} A promise object with facility detail.
   * @memberof FacilityService
   */
  static async amenitiesUpdate(amenities, facilityId) {
    try {
      const result = await sequelize.transaction(async () => {
        await AmenityFacility.destroy({ where: { facilityId } });
        const facilityAmenities = FacilityService.sortFacilityAmenities(amenities, facilityId);
        await AmenityFacility.bulkCreate(facilityAmenities);
        const options = { include: ['amenities'] };
        const facility = await FacilityService.findFacilityById(facilityId, options);
        return facility;
      });
      return result;
    } catch (err) {
      throw new Error('Failed to create facility. Try again');
    }
  }
}

export default FacilityService;
