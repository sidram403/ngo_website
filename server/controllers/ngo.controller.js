import Donation from "../models/donation.model.js";
import Fund from "../models/fund.model.js";
import Ngo from "../models/ngo.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getOrganizationNames = async (req, res, next) => {
  try {
    const organizations = await Ngo.find({}, 'organizationName');

    res.status(200).json(organizations);
  } catch (error) {
    next(error);
  }
};

export const getDonation = async (req, res, next) => {
  const {userId,ngoId} = req.body;
  let isExists = false;
  let userDetails=[];
  let donationDetails=[];
    
  try {
    const ngoDetails = await Donation.find({}, 'selectedNGO')

    const ngoIDs = ngoDetails.map((ngos) =>{
      const objectId = ngos._doc.selectedNGO

      if(ngoId === objectId){
        isExists = true
      }
  });
  if(isExists){
    const donationDetails = await Donation.find({ selectedNGO: ngoId });

    // If donations are found, store them in an array
    const donationArray = donationDetails.map(donation => donation._doc);

    const promisesUser = donationArray.map( async(donation) => {
      const userDetails = await User.findOne({_id:donation.user})
      return userDetails?._doc || null;
    })

    const userResults = await Promise.all(promisesUser)
    userDetails = userResults.filter(Boolean)
    

    res.status(200).json({ userDetails, donationDetails });
    
  }else{
    res.status(200).json({ userDetails, donationDetails });
  }

  } catch (error) {
    next(error);
  }
}

export const getServices = async (req, res, next) => {
  const {ngoId} = req.body;
  let isExists = false;
  let userDetails=[];
  let serviceDetails=[];
    
  try {
    const ngoDetails = await Service.find({}, 'selectedNGO')

    const ngoIDs = ngoDetails.map((ngos) =>{
      const objectId = ngos._doc.selectedNGO

      if(ngoId === objectId){
        isExists = true
      }
  });
  if(isExists){
    const serviceDetails = await Service.find({ selectedNGO: ngoId });

    // If donations are found, store them in an array
    const serviceArray = serviceDetails.map(service => service._doc);

    const promisesUser = serviceArray.map( async(service) => {
      const userDetails = await User.findOne({_id:service.user})
      return userDetails?._doc || null;
    })

    const userResults = await Promise.all(promisesUser)
    userDetails = userResults.filter(Boolean)
    

    res.status(200).json({ userDetails, serviceDetails });
    
  }else{
    res.status(200).json({ userDetails, serviceDetails });
  }

  } catch (error) {
    next(error);
  }
}

export const getFunds = async (req, res, next) => {
  const {ngoId} = req.body;
  let isExists = false;
  let userDetails=[];
  let fundDetails=[];
    
  try {
    const ngoDetails = await Fund.find({}, 'selectedNGO')

    const ngoIDs = ngoDetails.map((ngos) =>{
      const objectId = ngos._doc.selectedNGO

      if(ngoId === objectId){
        isExists = true
      }
  });
  if(isExists){
    const fundDetails = await Fund.find({ selectedNGO: ngoId });

    // If donations are found, store them in an array
    const fundArray = fundDetails.map(fund => fund._doc);

    const promisesUser = fundArray.map( async(fund) => {
      const userDetails = await User.findOne({_id:fund.user})
      return userDetails?._doc || null;
    })

    const userResults = await Promise.all(promisesUser)
    userDetails = userResults.filter(Boolean)
    

    res.status(200).json({ userDetails, fundDetails });
    
  }else{
    res.status(200).json({ userDetails, fundDetails });
  }

  } catch (error) {
    next(error);
  }
}