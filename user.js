function getRandomUserInfos() {
    // Отримати дані з сервісу Random User Generator для 5 користувачів
    Promise.all(Array.from({ length: 5 }, () => fetch('https://randomuser.me/api').then(response => response.json())))
        .then(usersData => {
            // Обробити дані для кожного користувача
            const usersInfo = usersData.map(user => {
                const picture = user.results[0].picture.large;
                const name = `${user.results[0].name.first} ${user.results[0].name.last}`;
                const cell = user.results[0].cell;
                const city = user.results[0].location.city;
                const postcode = user.results[0].location.postcode;
                return { picture, name, cell, city, postcode };
            });

            // Вивести дані на сторінку
            displayUserInfos(usersInfo);
        })
        .catch(error => console.error('Error fetching user info:', error));
}

function displayUserInfos(usersInfo) {
    // Вивести дані для всіх користувачів на сторінку
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = '';

    usersInfo.forEach(userInfo => {
        userInfoContainer.innerHTML += `
            <div class="userCard">
                <img src="${userInfo.picture}" alt="User Picture">
                <p><strong>Name:</strong> ${userInfo.name}</p>
                <p><strong>Cell:</strong> ${userInfo.cell}</p>
                <p><strong>City:</strong> ${userInfo.city}</p>
                <p><strong>Postcode:</strong> ${userInfo.postcode}</p>
            </div>
        `;
    });
}