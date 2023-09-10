const Customer = require('../model/Customer');


const getAllCustomers = async(req, res, next) =>{
    let customer;
    try {
        customer = await Customer.find();
        // res.json(Customer)
        
    } catch (err) {
        console.log(err) 
        // res.json(err)
    }

    if(!customer){
        return res.status(404).json({message : "No Customers found"})

    }
    return res.status(200).json({customer})
}


const addCustomer = async(req, res, next) => {
    const { firstName, lastName, email, phoneNumber, address} = req.body;
    let customer;

    try {
        customer = new Customer(
            {
               firstName, lastName, email, phoneNumber, address
            }
        );
        await customer.save()
    } catch (error) {
        console.log(error)
    }

    if(!customer){
        return res.status(500).json({message : "Unable to add book"})

    }
    return res.status(201).json({customer})

}

exports.getAllCustomers = getAllCustomers;
exports.addCustomer = addCustomer;