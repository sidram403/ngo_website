import Donation from "../models/donation.model.js";
import Fund from "../models/fund.model.js";
import FundRaise from "../models/fundraise.model.js";
import Service from "../models/service.model.js";




export const setDonation = async (req, res, next) => {
    const { item, quantity, date, selectedNGO , user } = req.body;
  
    const newDonation = new Donation({
      item,
      quantity,
      date,
      selectedNGO,
      user
    });
    

  
    try {
      await newDonation.save();
      res.status(201).json("Donation Created!");
    } catch (error) {
      next(error);
    }
  };

  export const setServices = async (req, res, next) => {
    const { service, date, duration, selectedNGO , user } = req.body;
  
    const newServices = new Service({
      service,
      date,
      duration,
      selectedNGO,
      user
    });
    

  
    try {
      await newServices.save();
      res.status(201).json("Services Created!");
    } catch (error) {
      next(error);
    }
  };

  export const setFunds = async (req, res, next) => {
    const { name, amount, date, selectedNGO , user } = req.body;
  
    const newFund = new Fund({
      name,
      amount,
      date,
      selectedNGO,
      user
    });
    

  
    try {
      await newFund.save();
      res.status(201).json("Fund Created!");
    } catch (error) {
      next(error);
    }
  };

  export const setFundRaise = async (req, res, next) => {
    const { fundname, amount, fundreason, ngo } = req.body;
  
    const newFundRaise = new FundRaise({
      fundname,
      amount,
      fundreason,
      ngo
    });
    

  
    try {
      await newFundRaise.save();
      res.status(201).json("Fund Raise Created!");
    } catch (error) {
      next(error);
    }
  };