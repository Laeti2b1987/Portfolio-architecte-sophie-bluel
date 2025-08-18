// Url de l'api
const apiUrl = 'http://localhost:5678/api/';

// Fonction pour récupérer les projets
function fetchProjects() {
  fetch(apiUrl +'works')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        let allProjects = [];
        console.log('Projets récupérés :', data); 
        allProjects = data; // on garde tous les projets
        displayProjects(data); 
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des projets :', error);
    });
}

// Fonction pour afficher les projets dans la galerie
function displayProjects(data) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  data.forEach(project => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = project.imageUrl;
    img.alt = project.title;

    const caption = document.createElement('figcaption');
    caption.textContent = project.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}
// Fonction pour récupérer les catégories
function fetchCategories() {
  fetch(apiUrl + 'categories')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(categories => {
      console.log('Catégories récupérées :', categories);
      generateCategoryMenu(categories); // À adapter selon ta fonction d'affichage
    })
    .catch(error => {
      console.error();
    });
}
// Fonction pour afficher et créer les catégories
function generateCategoryMenu(categories) {
  const menu = document.querySelector('.categories');
  menu.innerHTML = '';

  // Bouton "Tous"
  const allBtn = document.createElement('button');
  allBtn.textContent = 'Tous';
  allBtn.classList.add('category-btn','active');
  
  menu.appendChild(allBtn);

  // Boutons par catégorie
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.classList.add('category-btn');
    
    menu.appendChild(btn);
  });

}

// Appel de la fonction 
document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  fetchCategories();
  
 
});
    

