const articles = [
    {
        title: "Roman Settlements in Milton Keynes",
        author: "Placeholder",
        date: "2024-01-15",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    },
    {
        title: "The Construction of St Peter's Church",
        author: "Placeholder",
        date: "2024-01-10",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    },
    {
        title: "The Canal Era in Milton Keynes",
        author: "Placeholder",
        date: "2024-01-05",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    },
    {
        title: "Paris House: A Royal Safehouse",
        author: "Placeholder",
        date: "2024-01-01",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    },
    {
        title: "The Collapse of St Peter's Church Roof",
        author: "Placeholder",
        date: "2023-12-15",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    },
    {
        title: "The Birth of Milton Keynes",
        author: "Placeholder",
        date: "2023-12-10",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        img: "images/placeholder.svg",
        authorImg: "images/placeholder.svg",
        authorBio: "Historical Researcher"
    }
];

function renderArticles() {
    const container = document.getElementById('articlesList');
    container.innerHTML = articles.map((article, index) => `
        <div class="col-md-6 mb-4" id="article-${index}">
            <div class="card h-100">
                <img src="${article.img}" class="card-img-top" alt="Article: ${article.title} - Featured image">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <div class="d-flex align-items-center mb-3">
                        <img src="${article.authorImg}" class="rounded-circle me-2" width="40" height="40" alt="Author: ${article.author} - ${article.authorBio}">
                        <div>
                            <div class="fw-bold">${article.author}</div>
                            <small class="text-muted">${new Date(article.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <p class="card-text">${article.content}</p>
                    <button class="btn btn-primary" onclick="showArticle(${index})">Read More</button>
                </div>
            </div>
        </div>
    `).join('');

    
    const urlParams = new URLSearchParams(window.location.search);
    const articleIndex = urlParams.get('article');
    if (articleIndex !== null) {
        const articleElement = document.getElementById(`article-${articleIndex}`);
        if (articleElement) {
            const card = articleElement.querySelector('.card');
            card.classList.add('highlight');
            
            setTimeout(() => {
                articleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
            
            setTimeout(() => {
                card.classList.remove('highlight');
            }, 2000);
        }
    }
}

function showArticle(index) {
    const article = articles[index];
    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    document.getElementById('articleModalLabel').textContent = article.title;
    document.getElementById('articleContent').innerHTML = `
        <div class="text-center mb-4">
            <img src="${article.img}" class="img-fluid rounded" alt="Article: ${article.title} - Featured image">
        </div>
        <div class="d-flex align-items-center mb-4">
            <img src="${article.authorImg}" class="rounded-circle me-3" width="60" height="60" alt="Author: ${article.author} - ${article.authorBio}">
            <div>
                <h6 class="mb-1">${article.author}</h6>
                <p class="text-muted mb-0">${article.authorBio}</p>
            </div>
        </div>
        <p>${article.content}</p>
        <p class="text-muted"><small>Published on ${new Date(article.date).toLocaleDateString()}</small></p>
    `;
    modal.show();
}

document.addEventListener('DOMContentLoaded', function() {
    renderArticles();
}); 