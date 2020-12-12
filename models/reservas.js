/*import
*/
const mongoose = require('mongoose');
const Shema = mongoose.Schema;

/*
model Shema
*/
const ReservasShema = Shema({
    type_huesped:{type: String,enum: ['individual','pareja','familiar']},
    price:{ type:Number, dafault:0},
    sale:{ type:Number, dafault:0},
    dias:{ type:Number, dafault:0},
    costo_dias:{ type:Number,dafault:0},
    pago_neto:{ type:Number,dafault:0},
    descuento:{ type:Number,dafault:0},
    pago_bruto:{ type:Number,dafault:0},
    

    
})

/*
export the model
*/
module.exports = mongoose.model('reservas',ReservasShema)