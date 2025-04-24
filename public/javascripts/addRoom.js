async function addRoom(url) {
    let hotelId = prompt("Provide the hotel id")
    let capacity = prompt("Provide room capacity")
    let price = prompt("Provide room price")
    if (hotelId === null || capacity === null || price === null)
        return;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            HotelId : hotelId,
            Capacity : capacity,
            PricePerDay : price
        })
    }).then((response) => {
        if (response.ok) {
            const resData = 'Created a new room';
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
      .catch((response) => {
        alert(response.statusText);
      });
}