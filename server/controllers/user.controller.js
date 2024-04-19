import FundRaise from "../models/fundraise.model.js";
import Ngo from "../models/ngo.model.js";

export const getFundRequests = async (req, res, next) =>{
    try {
        let ngoDetails = []
        let fundRaiseDetails = []
        const fundRaisedData = await FundRaise.find();

        fundRaiseDetails = fundRaisedData.map(item => ({
            _id: item._id,
            fundname: item.fundname,
            amount: item.amount,
            fundreason: item.fundreason,
            ngo:item.ngo
            
        }));
        const promisesUser = fundRaiseDetails.map( async(fund) => {
            const ngoResults = await Ngo.findOne({_id:fund.ngo})
            return ngoResults?._doc || null;
          })
      
          const ngoResults = await Promise.all(promisesUser)
          ngoDetails = ngoResults.filter(Boolean)

        res.status(200).json({fundRaiseDetails,ngoDetails});
    } catch (error) {
        next(error);
    }
}