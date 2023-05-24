const Log = require("../models/log.model");
exports.getAlllog = async (req, res) => {
    const logs = await Log.find( )
         
    res.status(200).send({ data: logs })
}
 
  