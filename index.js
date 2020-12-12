/*server express
forma siete
gestionar rutas de los verbos
GET;POST;PUT;PATCH;DELETE con router*/

let express = require('express');
let bodyparser = require('body-parser');//cuando hagamos peticiones http rest,poder parsear el cuerpo de la peticion
const mongoose = require('mongoose');// para que la appi acceda a la DB con el metodo de conexion
/*produc
impot shema*/
const Reservas = require('./models/reservas');
const reservas = require('./models/reservas');

let app = express(); //iniciar express
const port = process.env.PORT ||3000;

/*
*niddlewares
*/
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

/*API
*/

// //POST
app.post('/Api/reservas',(req,res)=>{
   //use shema register product in the data bae*/
   console.log('POST/Api/reservas');
   console.log(req.body);

   let reservas=new Reservas();
   reservas.type_huesped=req.body.type_huesped;
    if(reservas.type_huesped=="individual"){
         reservas.price=req.body.price;
         reservas.sale=req.body.sale;
         reservas.dias=req.body.dias;
         reservas.costo_dias=reservas.price*reservas.dias,
         reservas.pago_neto=(reservas.costo_dias*0.19)+reservas.costo_dias;
         reservas.descuento=reservas.pago_neto*0.05;
            reservas.pago_bruto=reservas.pago_neto-reservas.descuento
    
    }if (reservas.type_huesped=="pareja") {
        reservas.price=req.body.price;
        reservas.sale=req.body.sale;
        reservas.dias=req.body.dias;
        reservas.costo_dias=reservas.price*reservas.dias,
        reservas.pago_neto=(reservas.costo_dias*0.19)+reservas.costo_dias;
        reservas.descuento=reservas.pago_neto*0.09;
       reservas.pago_bruto=reservas.pago_neto-reservas.descuento
    } else {
        reservas.price=req.body.price;
        reservas.sale=req.body.sale;
        reservas.dias=req.body.dias;
        reservas.costo_dias=reservas.price*reservas.dias,
        reservas.pago_neto=(reservas.costo_dias*0.19)+reservas.costo_dias;
        reservas.descuento=reservas.pago_neto*0.15;
       reservas.pago_bruto=reservas.pago_neto-reservas.descuento
    }

        
   reservas.save((err,reservasStored)=>{
        if(err) res.status(500).send({message: `Reserva Save Error: ${err}`})

         res.status(200).send({reservas: reservasStored});
     })
})

 //get user
app.get('/Api/reservas',(req,res)=>{
   //res.send(200,{products:[]})

   Reservas.find({}, (err,reservas)=>{
        if (err) return res.status(500).send({
           message: `Error When Requesting:${err}`
        })

       if(!reservas) return res.status(404).send({
           message: 'There Are No Reserva'
       })
       res.status(200).send({reservas})
   })

 }) 
 
 //get one
app.get('/Api/reservas/:reservastId', (req,res)=>{
    let reservasId=req.params.reservastId

     Reservas.findById(reservasId,(err,reservas)=>{
         if(err) return res.status(500).send({
             message: `Error When Requesting: ${err}`
         })
         if(!reservas) return res.status(404).send({
             message: 'Reserva does not exist'
         })

         res.status(200).send({reservas})
     })
 })

// //put

app.put('/Api/reservas/:reservasId',(req,res)=>{
   let reservasId=req.params.reservasId
   let updateData=req.body

 Reservas.findByIdAndUpdate(reservasId,updateData, (err, reservasUpdated)=>{

     if(err) return res.status(500).send({
           message: `Faile To Update Data: ${err}`
        })
        res.status(200).send({reservas: reservasUpdated})
    })
      
 })

//delete
app.delete('/Api/reservas/:reservasId',(req,res)=>{
     let reservasId=req.params.reservasId

     Reservas.findById(reservasId,(err,reservas)=>{
         if(err) return res.status(500).send({
             message: `Error Deleting Reserva: ${err}`
         })
         if(!reservas) return res.status(404).send({
             message: `Reserva Does Not Exist`
         })
         reservas.remove(err=>{
             if(err) return res.status(500).send({
                 message: `Error Deleting: ${err}` 
             })

         res.status(200).send({
             message: 'producto removed'
         })

     })
 })
 })

/*Conexiom desde la aplicacion hacia mongo
*/
mongoose.connect('mongodb://localhost:27017/hotel',(err, res)=>{
    if (err) throw err
    console.log('Database connection OK');
    const server = app.listen(port,()=>{
        console.log(`listening http://localhost:${ server.address().port}`)
    })
})