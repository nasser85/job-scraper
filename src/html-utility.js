export class HtmlUtility {
      static triggerModal(el) {
        var prospect = HtmlUtility.cache.data[el.dataset['leadNumber']];
        HtmlUtility.cache.company.innerHTML = prospect.company;
        HtmlUtility.cache.job.innerHTML = prospect.job;
        HtmlUtility.cache.company.innerHTML = prospect.company;
        HtmlUtility.cache.location.innerHTML = prospect.location;
        HtmlUtility.cache.content.innerHTML = prospect.descriptionHTML;
        HtmlUtility.cache.modal.classList.add('open');

      }
      static produceCard(prospect, index, arr) {
        return index > 0 ? `<div class="job-scraper__item-wrapper">
                <div class="job-scraper__item">
                    <div class="job-scraper__item-header">
                        <p class=""><strong>${prospect.company.toUpperCase()}</strong></p>
                        <p class=""><strong>${prospect.job}</strong></p>
                        <p class=""><em>From</em> ${prospect.date} | ${prospect.location}</p>
                    </div>
                     <div class="job-scraper__item-content">
                        <p class="">${prospect.truncatedDescription}</p>
                    </div>
                     <div class="job-scraper__item-footer">
                        <p class="job-scraper__item-footer-content"><a data-lead-number="${index}" class="job-scraper__item-button">View Job</a></p>
                    </div>
                </div>
            </div>` : '';
      }
      static closeModal() {
        this.cache.modal.classList.remove('open');
      }
    }