# Event Favorite Stats

Use this script to print the ratings of an event from the Events Platform ™.

## Example Output

    Automate or die! Real world automation survival: 4
    Serenity BDD in action: 3
    Workshop Performance testing made easy with Gatling: 3
    Advanced layout testing for responsive websites with Galen 2.0: 2
    The magic of models for 100% test automation: 2
    Scalable QA with Docker: 1
    Workshop BDD in AngularJS apps using protractor and cucumber: 1

## Usage

Check the eventId of your event and get your Parse Application Id and REST API Key. In the example below we use abcd1234.

Then retrieve the Talks and UserFavoriteTalks of the event using the following requests (make sure to use the eventId of your event and make sure the output directory exists):

Get all ratings of the event:

    curl -X GET \
      -H "X-Parse-Application-Id: qrst567" \
      -H "X-Parse-REST-API-Key: uvw890" \
      -G \
      --data-urlencode 'include=talk' \
      --data-urlencode 'where={"talk": {"$inQuery": {"where":  {"event":{"__type":"Pointer","className":"Event","objectId":"abcd1234"}}, "className": "Talk"}}}' \
      --data-urlencode 'limit=1000' \
      https://api.parse.com/1/classes/Rating > out/Ratings.json

Next, run the index.js script with the two json files as input.

    node index.js out/Ratings.json
