const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')
const request=require('postman-request')

const app=express()
const port=process.env.PORT|| 9000

//Define Path for express config
const viewpath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,'../templates/partials')

//seetup handlebars engine and view location 
app.set('view engine','hbs')
app.set('views',viewpath    )
hbs.registerPartials(partialsPath)

//setup static dictnary to serve

app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>
{
    res.render('index',{
        name:"Krunal Dhardev",
        nickName:"KD"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        name:"Krunal Dhardev",
        help:"More Query Contact on Email :krunal4dhardev@gmail.com"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Krunal Dhardev",
        info:"Web Developer"
    })
})

app.get("/weather",(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:"Sorry U have give Name"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            res.send({error})
        }

        forcast(latitude,longitude,(error,forcastdata)=>{
            console.log(forcastdata)
            if(error)
            {
                res.send(error)
            }
            res.send({
                forcast:forcastdata,
                location,
                address:req.query.address
            })            


        })

    })


    // res.send({
    //     forcast:"It is Snowing",
    //     location:"Rajkot"
    // })
})

app.get("/help/*",(req,res)=>
{
    res.render("error",{
        title:" 404 ",
        name:"Krunal Dhardev",
        errorMessage:"Help articel not found"
    })
})

app.get("*",(req,res)=>{
    res.render("error",{
        title:" 404 ",
        name:"Krunal Dhardev",
        errorMessage:"Page Not Found"
    })
})


app.listen(port, ()=>
{
    console.log("Server Is up on port "+port )
})