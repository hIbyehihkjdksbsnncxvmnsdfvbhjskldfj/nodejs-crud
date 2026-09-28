import express from "express";
import { Sequelize,DataTypes } from "sequelize";

const app = express();
const PORT = 3000;
app.use(express.json());

const sequelize = new Sequelize("abcd","root","",{
    "host":"localhost",
    "port":Number(3306),
    dialect:"mysql",
    logging:false
})

const Subject = sequelize.define("Subject",{
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    semester:{
       type: DataTypes.STRING(50),
       allowNull: false 
    },
    program:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
},
{
    tableName:"subjects",
  
});

app.get("/subjects",async(req,res)=>{
       try{
            const data = await Subject.findAll();
    res.json({
        message:"success",
        data:data
    });
        }catch(err){
            console.log(err);
        }        
});

app.post("/subjects",async(req,res)=>{
    const subjects = await Subject.create(req.body);

     res.json({
        message:"success",
        data:subjects,
    });
});

app.put("/subjects/:id",async(req,res)=>{
    const subjects = await Subject.update(req.body,{
        where:{id:req.params.id}
    });
    res.json({
        message:"success",
        data:subjects,
    });
});

app.delete("/subjects/:id",async(req,res)=>{
    const subjects = await Subject.destroy({
        where:{id:req.params.id}
    });
    res.json({
        message:"success",
        data:subjects,
    });
});

async function startServer(){
    await sequelize.authenticate();
    await sequelize.sync();
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});
}

startServer();

