{1, 2, 3) for /
{4} for /repos/skyljack+infoskyljackcom
{5,6} for /repos/tag/clients

convert nested objects to array of objects
const clientArray =[];
    const keyArray = [];
    for (var key in clients) {
       console.log(clients[key]);
       console.log(key);
       keyArray.push(key);
       clientArray.push(clients[key]);
    }
    console.log(keyArray.length);

