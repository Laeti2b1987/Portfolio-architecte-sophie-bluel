// Url de l'api
const apiUrl = 'http://localhost:5678/api/';
let allProjects = [];

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
        
        console.log('Projets récupérés :', data); 
        allProjects = data; // 
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
      generateCategoryMenu(categories); 
    })
    .catch(error => {
      console.error();
    });
}
// Fonction pour afficher et créer les catégories
function generateCategoryMenu(categories) {
  const menu = document.querySelector('.categories');
  menu.innerHTML = '';

  // Bouton Tous
  const allBtn = document.createElement('button');
  allBtn.textContent = 'Tous';
  allBtn.classList.add('category-btn','active');
   allBtn.dataset.category = 'Tous';
  allBtn.addEventListener('click', () => {
    displayProjects(allProjects);
    setActiveButton(allBtn);
    });
  menu.appendChild(allBtn);

  // Boutons par catégorie
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.classList.add('category-btn');
     btn.dataset.category = category.name;
    btn.addEventListener('click', () => {
      const filtered = allProjects.filter(project => project.category.name === category.name);
      displayProjects(filtered);
      setActiveButton(btn);
    });
    menu.appendChild(btn);
  });

}
function setActiveButton(activeBtn) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

// Appel de la fonction 
document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  fetchCategories();
  
 
});
    

