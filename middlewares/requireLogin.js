module.exports = (req,res,next)=>{
    if(!req.user){
        return status(401).send({error:'User must loged in first'});
    }
    next();

}