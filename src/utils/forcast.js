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
            callback(undefined,body.current.weather_descriptions[0]+ ' IT is Currently  '+body.current.temperature+' degress out. It Feels like '+body.current.feelslike+'  Degress Out. The Humidity is '+body.current.humidity+' %.')
        }

    })
}

module.exports=forcast