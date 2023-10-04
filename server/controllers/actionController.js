const User = require('../../models/userModel');
const { Location } = require('../../models/userModel');
const mongoose = require('mongoose');

//const bcrypt = require('bcryptjs');
const express = require("express");
const db = require('../../models/placesModel');
const { Client } = require('pg');
const actionController = {};


//from search screen when user presses save
actionController.saveTo = async (req,res,next) => {
    try{
        //deconstruct the request body
        let email = req.body.email;
        let address = req.body.address;
        let location = req.body.location;
        //make a newSave Location object
        //update object according to email -> if it doesn't exist, create new document with said email
        console.log("email, location and address are" +  email + address + location);
        //console.log("User exists? " )
        const result = await User.findOneAndUpdate({email: email}, 
            {$push: {savedList: {location: location, address: address, score: '0'}}}, 
            { returnOriginal: false});
        //console.log(result);
        //console.log(User.findOne({email: email}, {savedList: 1}))
        res.locals.user = result;
        //console.log(res.locals.user)
        console.log(User.find({email: email}, {savedList: 1}))
        return next();
    }catch(err){
        err = {
            log: 'There was an error in the actionController.saveTo middleware' + err,
            status: 500,
            message: { err: 'There was an unknown server error'}
        }
        return next(err);
    }
}

actionController.getRows = async (req,res,next) =>{
    try{
        let {email} = req.body;
        console.log('in getRows email', email);
        const result = await User.findOne({email: email}, {savedList:1});
        res.locals.savedList = result;
        console.log(result);
        next();

    }catch(err){
        err = {
            log: 'There was an error in the actionController.saveTo middleware' + err,
            status: 500,
            message: { err: 'There was an unknown server error'}
        }
        return next(err);
    }
}

//     //when user press rate-> add an addition to the have been database
// actionController.addBeen = async (req,res,next) => {
//     try{
//         //deconstruct request body into rating and location
//         let {email,rating,location,address} = req.body;
//         //create the newRating in the haveBeen
//         const result = await User.updateOne({email: email}, 
//             {$push: {location: location, address: address, score: rating}}, 
//             {upsert: true});
//         res.locals.user = result;
//         return next();

//     }catch(err){
//         err = {
//             log: 'There was an error in the actionController.rateAddBeen middleware' + err,
//             status: 500,
//             message: { err: 'There was an unknown server error'}
//         }
//         return next(err);
//     }
//};

module.exports = actionController;