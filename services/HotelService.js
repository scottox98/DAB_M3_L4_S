const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');
class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.Rate = db.Rate;
        this.User = db.User;
    }

    //Create a hotel using raw SQL
    async create(name, location) {
        return this.Hotel.create(
            {
                Name: name,
                Location: location
            }
        ).catch(function(err)  {
            console.log(err)
        });
    }

    //Get all hotels using raw SQL
    async get() {
        return this.Hotel.findAll({
            where : {}
        }).catch(function(err)  {
            console.log(err)
        });
    }

    //Get hotel details using raw SQL	
    async getHotelDetails(hotelId, userId) {
        //Retrive hotel data
        const hotel = await this.Hotel.findOne({
            where : {
                id : hotelId
            },
            include : {
                model: this.User,
                through:{
                    attributes:['Value']
                }
            },
        }).catch(function(err)  {
            console.log(err)
        });
        if (hotel !=null){
            hotel.avg = hotel.Users.map(x => x.Rate.dataValues.Value)
            .reduce((a,b) => a+b,0) / hotel.Users.length;
            hotel.rated = hotel.sers.filter(x=>dataValues.id == userId).length>0;
        }
        return hotel;
        }

    //Delete a hotel using raw SQL
    async deleteHotel(hotelId) {
        return this.Hotel.destroy({
            where:{id:hotelId}
        }).catch(function(err)  {
            console.log(err)
        });
    }

    //Rate a hotel using raw SQL
    async makeARate(userId, hotelId, value) {
        return this.Rate.create(
            {
                UserId: userId,
                HotelId: hotelId,
                Value: value
            }
        ).catch(function(err){
            console.log(err);
        })
}
}
module.exports = HotelService;