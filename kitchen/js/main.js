const categoryButtons = document.querySelectorAll('[data-category]');
const searchInput = document.querySelector('#recipe-search');
const recipeCards = document.querySelectorAll('.recipe-card');
const emptyState = document.querySelector('#empty-state');
let activeCategory = 'all';

function updateRecipes() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  recipeCards.forEach((card) => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category.split(' ').includes(activeCategory);
    const matchesSearch = !query || card.dataset.search.includes(query);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((categoryButton) => categoryButton.classList.toggle('is-active', categoryButton === button));
    updateRecipes();
  });
});

searchInput.addEventListener('input', updateRecipes);