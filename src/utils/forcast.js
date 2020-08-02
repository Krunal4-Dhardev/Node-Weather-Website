const request=require('postman-request')
const { response } = require('express')

const forcast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=7d2dd3aea84ff0e1ff570772fa9d005c&query='+latitude+','+longitude+'&units=f'


    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback("Unable to connect Weather Services!",undefined)
        }
        else if (body.error)
        {
            callback("Unable to connect to Loaction Pleae try to another services",undefined)
        }
        else
        {
            const uvindex=body.current.uv_index
            var info=""
            if (uvindex <=2)
            {
                info="Low"
            }
            else if(uvindex >2 && uvindex <=5)
            {
                info="Moderate"
            }
            else if (uvindex >5 && uvindex <=7)
            {
                info="High"
            }
            else if(uvindex >7 && uvindex <=10)
            {
                info="Very High"
            }
            else if(uvindex ==11)
            {
                info="extreme"
            }
            else{
                info="sommthing rong"
            }
            
            callback(undefined,body.current.weather_descriptions[0]+ ' IT is Currently  '+body.current.temperature+' degress out.'+
                ' It Feels like '+body.current.feelslike+' Degress Out.'+
                ' The Humidity is '+body.current.humidity+' %.'+
                ' UV Index is : '+info
            )
        }

    })
}

module.exports=forcast