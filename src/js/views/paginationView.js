import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 , and there are another pages
    if (currPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currPage - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>
          `;
    }
    // Other page
    if (currPage < numPages) {
      return `
      <button data-goto="${
        currPage - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>
          <button data-goto="${
            currPage + 1
          }"  class="btn--inline pagination__btn--next">
            <span>${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
              </svg>
              </button>
          `;
    }

    // Page 1,and there are NO other pages

    return '';
  }
}

export default new PaginationView();
