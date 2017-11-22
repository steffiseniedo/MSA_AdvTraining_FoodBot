var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/cc938fde-d96e-48a4-89d7-9638b0d29c5c?subscription-key=7ccae9875c724aaa89f36cafe3899d87&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    //GetCalories intent
    bot.dialog('GetCalories', function (session, args) {

        session.send("Get Calories intent found")

    }).triggerAction({
        matches: 'GetCalories'
    });

    //DeleteFavourites intent
    bot.dialog('DeleteFavourites', function (session, args) {
        
        session.send("Delete Favourites intent found")

    }).triggerAction({
        matches: 'DeleteFavourites'
    });

    //GetFavouriteFood intent
    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
        }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    //LookForFavourite intent
    bot.dialog('LookForFavourite', function (session, args) {
        
        session.send("Look For Favourite intent found")

    }).triggerAction({
        matches: 'LookForFavourite'
    });

    //WantFood intent
    bot.dialog('WantFood', function (session, args) {
        
        session.send("Want Food intent found")

    }).triggerAction({
        matches: 'WantFood'
    });

    //WelcomeIntent intent
    bot.dialog('WelcomeIntent', function (session, args) {
        
        session.send("Welcome Intent found")

    }).triggerAction({
        matches: 'WelcomeIntent'
    });
}