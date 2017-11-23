var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/296df1c2-5a8a-4b3d-ad11-ac1f3a7832e1/url?iterationId=a147647a-c97b-4a87-8ccd-4d324ce352a1',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '863cda062bf3481693a0a1cbae0db091'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}