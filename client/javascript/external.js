/*
document.querySelector('#size').innerHTML = 'Size: ' + socks.size;
document.querySelector('#color').innerHTML = 'Color: ' + socks.color;
document.querySelector('#pattern').innerHTML = 'Pattern: ' + socks.pattern;
document.querySelector('#material').innerHTML = 'Material: ' + socks.material;
document.querySelector('#condition').innerHTML = 'Condition: ' + socks.condition;
document.querySelector('#for_foot').innerHTML = 'For Foot: ' + socks.forFoot;
*/

async function getData() {
    // Use fetch to retrieve data over the network from an API endpoint
    let btn = document.querySelector("#nextbtn")
    if (btn.value == undefined || btn.value == null) {
        btn.value = "0"
    }

    let page = ++btn.value
    let endpoint = 'http://localhost:9000/api/socks/' + page + '/10'
    console.log('FETCH: ' + endpoint);

    const socks = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data.length == 0) {
                alert('No more data to fetch! Starting over from the beginning.');
                btn.value = 0;
                getData()
                return;
            }
            return data;
        })
        .catch(err => console.error('Error:', err))
    
    //console.log(socks)
    if (socks != undefined)
        updateHTML(socks); // Update HTML after data is fetched
};

function updateHTML(socks) {

    if (document.getElementsByTagName('tr') != 0) {
        document.getElementById('tbody').innerHTML = '';
    }

    // Now we are sure that socks is defined and contains the data
    let sockTd = "";
    let sockList = [];

    for (let i = 0; i < socks.length; i++) {
        sockList = socks[i]['sockDetails'];
        let sock = sockList;
        let sockTr = document.createElement('tr');

        for (k in sock) {
            sockTd = document.createElement('td');
            sockTd.innerHTML = `<td>${sock[k]}</td>`;
            sockTr.appendChild(sockTd);
        }

        /*sockTd = document.createElement('td');
        sockTd.innerHTML = `<td>${sock.size}</td>`;
        sockTr.appendChild(sockTd);*/

        //sockDiv.innerHTML = `<div>Color: ${sock.color}</div><div>Size: ${sock.size}</div>`;
        document.getElementById('tbody').appendChild(sockTr);
    }

    /*if (socks.color !== null && socks.color !== undefined) {
        document.querySelector('#color').style.backgroundColor = socks.color;
    }*/
}

// Call the function to fetch and update data
//getData();