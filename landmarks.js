const landmarks = [
    {
        name: "Bletchley Park",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "09:00 - 17:00"],
            ["Saturday-Sunday", "10:00 - 18:00"]
        ]
    },
    {
        name: "St Peter's Church Ruins",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "08:00 - 16:00"],
            ["Saturday-Sunday", "09:00 - 17:00"]
        ]
    },
    {
        name: "Paris House",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "10:00 - 16:00"],
            ["Saturday-Sunday", "11:00 - 15:00"]
        ]
    },
    {
        name: "Windmill Hill",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "09:00 - 17:00"],
            ["Saturday-Sunday", "10:00 - 18:00"]
        ]
    },
    {
        name: "Bradwell Abbey",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "09:00 - 17:00"],
            ["Saturday-Sunday", "10:00 - 18:00"]
        ]
    },
    {
        name: "Campbell Park Tower",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "09:00 - 17:00"],
            ["Saturday-Sunday", "10:00 - 18:00"]
        ]
    },
    {
        name: "The Tree Cathedral",
        img: "images/placeholder.svg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam vitae nisi sit amet lorem accumsan porta.",
        times: [
            ["Monday-Friday", "09:00 - 17:00"],
            ["Saturday-Sunday", "10:00 - 18:00"]
        ]
    }
];

function renderLandmark(idx) {
    const lm = landmarks[idx];
    let tableRows = lm.times.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
    document.getElementById('landmarkContent').innerHTML = `
        <h2 class="mb-4">${lm.name}</h2>
        <img src="${lm.img}" class="landmark-img" alt="${lm.name}">
        <p>${lm.desc}</p>
        <table class="table table-bordered w-auto mb-4">
            <thead><tr><th>Day</th><th>Opening Time</th></thead>
            <tbody>${tableRows}</tbody>
        </table>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const landmarkList = document.getElementById('landmarkList');
    landmarkList.addEventListener('click', function(e) {
        if (e.target.matches('.list-group-item')) {
            document.querySelectorAll('#landmarkList .list-group-item').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderLandmark(Number(e.target.dataset.index));
        }
    });
    // Initial render
    renderLandmark(0);
}); 