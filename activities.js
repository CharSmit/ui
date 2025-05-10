const activities = [
    {
        name: "Bletchley Park",
        img: "images/placeholder.svg",
        desc: "A historic site and museum, Bletchley Park is famous for its role in codebreaking during World War II.",
        prices: [
            ["Children (under 12)", "£8"],
            ["Teenagers", "£10"],
            ["Adults", "£15"],
            ["Seniors", "£12"]
        ]
    },
    {
        name: "Milton Keynes Museum",
        img: "images/placeholder.svg",
        desc: "Explore the history of Milton Keynes and its people at this interactive museum.",
        prices: [
            ["Children (under 12)", "£5"],
            ["Teenagers", "£7"],
            ["Adults", "£12"],
            ["Seniors", "£9"]
        ]
    },
    {
        name: "Gulliver's Land",
        img: "images/placeholder.svg",
        desc: "A family theme park with rides and attractions for children of all ages.",
        prices: [
            ["Children (under 12)", "£15"],
            ["Teenagers", "£18"],
            ["Adults", "£20"],
            ["Seniors", "£16"]
        ]
    },
    {
        name: "Woburn Safari Park",
        img: "images/placeholder.svg",
        desc: "Drive through animal reserves and see exotic animals up close at Woburn Safari Park.",
        prices: [
            ["Children (under 12)", "£12"],
            ["Teenagers", "£15"],
            ["Adults", "£22"],
            ["Seniors", "£18"]
        ]
    },
    {
        name: "Milton Keynes Station",
        img: "images/placeholder.svg",
        desc: "Leave Milton Keynes",
        prices: [
            ["Children (under 12)", "£3"],
            ["Teenagers", "£4"],
            ["Adults", "£6"],
            ["Seniors", "£3"]
        ]
    }
];

function renderActivity(idx) {
    const act = activities[idx];
    let tableRows = act.prices.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
    document.getElementById('activityDetail').innerHTML = `
        <h3>${act.name}</h3>
        <img src="${act.img}" class="img-fluid mb-3" alt="${act.name} - ${act.desc.split('.')[0]}">
        <p>${act.desc}</p>
        <h5>Pricing</h5>
        <table class="table table-bordered w-auto mb-3">
            <thead><tr><th>Person</th><th>Price</th></tr></thead>
            <tbody>${tableRows}</tbody>
        </table>
        <button class="btn btn-primary" id="bookBtn">Book</button>
    `;
    document.getElementById('bookBtn').onclick = function() {
        localStorage.setItem('selectedActivity', JSON.stringify(act));
        window.location.href = `booking.html?activity=${encodeURIComponent(act.name)}`;
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const activityList = document.getElementById('activityList');
    activityList.addEventListener('click', function(e) {
        if (e.target.matches('.list-group-item')) {
            document.querySelectorAll('#activityList .list-group-item').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderActivity(Number(e.target.dataset.index));
        }
    });

    document.getElementById('activitySearch').addEventListener('input', function(e) {
        const val = e.target.value.toLowerCase();
        document.querySelectorAll('#activityList .list-group-item').forEach((btn, idx) => {
            if (activities[idx].name.toLowerCase().includes(val)) {
                btn.style.display = '';
            } else {
                btn.style.display = 'none';
            }
        });
    });

    renderActivity(0);
}); 