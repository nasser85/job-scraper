import {HtmlUtility} from './html-utility';
import {JobProspect} from './job-prospect';
import {IndeedParser} from './indeed-parser';
import $ from "jquery";

export default class Scraper {
  constructor(jobTitle, city, state, type=null) {
    this.jobTitle = jobTitle.replace(/ /g, '+').replace(/,/g, '%2C');
    this.city = city.replace(/ /g, '+').replace(/,/g, '%2C');
    this.state = state.replace(/ /g, '+').replace(/,/g, '%2C');
    this.type = type;
    this.query = 'http://allorigins.me/get?url=https%3A//www.indeed.com/jobs%3Fq%3D' + this.jobTitle + '%26l%3D' + this.city + '%252C+' + this.state + '&callback=?';
  }

  init() {
    return $.getJSON(this.query)
      .then(data=>data.contents.split('data-tn-component="organicJob"')
                               .map(el=>el.replace(/\n/g, ''))
                               .map(el=>{
                                  var prospect = new JobProspect(IndeedParser.getCompany(el), IndeedParser.getLocation(el), IndeedParser.getDate(el), IndeedParser.getTitle(el), IndeedParser.getUrl(el), null, IndeedParser.getTruncation(el), el)
                                  IndeedParser.setDescription(el, this.query, prospect);
                                  return prospect;
                                }))
      .catch(err=>{throw err})
  }

  renderCards(arr) {
    let el = document.getElementById('job-scraper-box');
    const preHtml = `<div class="job-scraper__modal-veil">
        <div class="job-scraper__modal-wrapper">
            <div class="job-scraper__modal-header">
                <p><span class="job-scraper__close-box">X</span></p>
                <p class="job-scraper__company"></p>
                <hr />
                <p class="job-scraper__title"></p>
                <p class="job-scraper__location"></p>
                <p class="job-scraper__date"></p>
                <p>. . .</p>
            </div>
            <div class="job-scraper__modal-container">
            </div>
            <div class="job-scraper__modal-footer">
                <a class="job-scraper__modal-apply" target="_blank">Apply to Job</a>
            </div>
        </div>
    </div>`;
    el.insertAdjacentHTML('beforebegin', preHtml);
    HtmlUtility.cache = {
        modal: document.getElementsByClassName('job-scraper__modal-veil')[0],
        company: document.getElementsByClassName('job-scraper__company')[0],
        job: document.getElementsByClassName('job-scraper__title')[0],
        location: document.getElementsByClassName('job-scraper__location')[0],
        date: document.getElementsByClassName('job-scraper__date')[0],
        content: document.getElementsByClassName('job-scraper__modal-container')[0],
        data: arr,
      apply: document.getElementsByClassName('job-scraper__modal-apply')[0]
    }
    var html = `<div class="job-scraper__items-container">` + arr.map(HtmlUtility.produceCard).join('') + `</div>`;
    el.insertAdjacentHTML('beforebegin', html);
    el.parentElement.removeChild(el);
    const cardButtons = document.getElementsByClassName('job-scraper__item-button');
    const closeModalButton = document.getElementsByClassName('job-scraper__close-box')[0];

    closeModalButton.addEventListener('click', ()=>{
      HtmlUtility.closeModal();
    })

    for (var i = 0; i < cardButtons.length; i++) {
      cardButtons[i].addEventListener('click', e=>{
        HtmlUtility.triggerModal(e.srcElement)
      });
    }
  }

}
