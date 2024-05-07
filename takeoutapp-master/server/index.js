const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createConnection({
    host:"sh-cdb-7elysgui.sql.tencentcdb.com",
    user:"root",
    password:"xnx021128",
    database:"takeoutapp",
    port:"63887"
})
app.use(cors());
app.use(express.json());
app.get("/allcustomer", (req,res)=>{
   const q = "SELECT * FROM customer";
   db.query(q,(err,data)=>{
    if(err){
        return res.json(err);
    } else {
        return res.json(data);
    }
   })
})
app.post("/addcustomer",(req,res)=>{
    const q = "INSERT INTO `customer` (`Customer_id`, `Name`, `Address`, `Phone_num`,`password`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.address,
        req.body.phonenum,
        req.body.password
    ];
    db.query(q,[values],(err,data)=>{
        if (err) {
            return res.json(err);
        } else {
          return res.json(null) ;
        }
    });
    
})
app.get("/showmenu",(req,res)=>{
    const q = "SELECT * FROM `menu`";
    db.query(q,(err,data)=>{
     if(err){
         return res.json(err);
     } else {
         return res.json(data);
     }
    })
})
app.post("/addmenu",(req,res)=>{
    const q = "INSERT INTO `customer` (`Customer_id`, `Name`, `Address`, `Phone_num`,`password`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.address,
        req.body.phonenum,
        req.body.password
    ];
    db.query(q,[values],(err,data)=>{
        if (err) {
            return res.json(err);
        } else {
          return res.json(data);
        }
    });
})
app.get("/namebyid",(req,res)=>{
    const q = `Select Name from customer where Customer_id = '${req.query.id}'`
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/menuwithselect",(req,res)=>{
    const q = `SELECT * FROM menu where Name like '%${req.query.searchcontent}%'`;
    console.log(q);
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/mycomment",(req,res)=>{
    const q = `SELECT * FROM comment where customer_Customer_id = '${req.query.id}'`;
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/mysignin",(req,res)=>{
    const q = `SELECT * FROM customer where Customer_id = '${req.query.id}' and password = '${req.query.password}'`;
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/selectrestaurant",(req,res)=>{
    const q= `SELECT * FROM menu where restaurant_Restaurant_id = ${req.query.restaurant}`;
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/selectbyid",(req,res)=>{
    const q=`SELECT * FROM customer where customer_id = '${req.query.id}'`;
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/selectevery",(req,res)=>{
    const q=`SELECT * FROM takeoutapp.order where customer_Customer_id = '${req.query.Id}'`;
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.get("/selectbyorderid",(req,res)=>{
    const q=`SELECT * FROM  takeoutapp.orderdetailbyorderid where order_Order_id = ${req.query.Id};`
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            console.log(data)
            return res.json(data);
        }
       })
})
app.get("/selectfromorder",(req,res)=>{
    const q=`SELECT Order_id,DATE_FORMAT(Time, '%Y-%m-%d %H:%i:%S') AS Time,Total_price,Cur_status,delivery_guy_Delivery_guy_id FROM  takeoutapp.order where customer_Customer_id = '${req.query.Id}';`
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        } else {
            return res.json(data);
        }
       })
})
app.post("/buy",(req,res)=>{
    const q="INSERT INTO `order` (`Time`,`Total_price`,`Cur_status`,`customer_Customer_id`,`delivery_guy_Delivery_guy_id`) VALUES (?);"
    const qq="INSERT INTO `order_detail` (`menu_Menu_id`, `menu_restaurant_Restaurant_id`, `order_Order_id`, `amount`) VALUES ?;"
    const e=new Date()
    const f=e.toLocaleString()
    const values = [
        f,
        req.body.price,
        0,
        req.body.id,
        1
    ];
    db.beginTransaction((err)=>{
        if(err)
        {return res.json(err);}
        db.query(q,[values],(error,data)=>{
            
            if(error)
            {
                db.rollback();
                return res.json(error);
            }
            const thevalue=req.body.buy.map((item)=>{
                return [item.id,item.restaurant_Restaurant_id,data.insertId,item.num]
            })
            db.query(qq,[thevalue],(err,data)=>{
                if(err)
                {
                   db.rollback();
                   return res.json(err);
                }
                db.commit((err)=>{
                    if(err)
                    {
                        db.rollback();
                        return res.json(err);
                    }
                return res.json(null);
            })

            
            })
        })
    })
    
})
app.post("/setlike",(req,res)=>{
    const q="UPDATE `menu` SET `Likes` = Likes+1 WHERE (`Menu_id` = ?) and (`restaurant_Restaurant_id` = ?);"
    const values=[
        req.body.id,
        req.body.restaurant_id
    ]
    db.query(q,values,(err,data)=>{
        if (err) {
            return res.json(err);
        } else {
          return res.json(null);
        }
    });
})
app.post("/confirm",(req,res)=>{
    const q="UPDATE `takeoutapp`.`order` SET `Cur_status` = '1' WHERE (`Order_id` = (?))";
    const values =[
        req.body.id
    ]
    db.query(q,[values],(err,data)=>{
        if (err) {
            return res.json(err);
        } else {
          return res.json(null);
        }
    });
})
app.listen(3001,()=>{
    console.log("Conncted!");
})