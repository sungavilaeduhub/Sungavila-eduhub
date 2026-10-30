const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchStatus = document.getElementById('searchStatus');
const cards = [...document.querySelectorAll('.searchable')];
const noResults = document.getElementById('noResults');
const placeholder = document.getElementById('resourcePlaceholder');
function runSearch() {
  const query = searchInput.value.trim().toLowerCase();
  let matches = 0;
  cards.forEach(card => {
    const text = ((card.innerText || '') + ' ' + (card.dataset.search || '')).toLowerCase();
    const match = !query || text.includes(query);
    card.classList.toggle('search-hidden', !match);
    card.style.display = match ? '' : 'none';
    if (match) matches++;
  });
  if (!query) {
    searchStatus.textContent = 'Choose a category below to explore resources.';
    noResults.hidden = true;
    placeholder.style.display = '';
  } else {
    searchStatus.textContent = `${matches} matching ${matches === 1 ? 'category' : 'categories'} found.`;
    noResults.hidden = matches !== 0;
    placeholder.style.display = '';
  }
}
searchInput.addEventListener('input', runSearch);
clearSearch.addEventListener('click', () => { searchInput.value = ''; runSearch(); searchInput.focus(); });
