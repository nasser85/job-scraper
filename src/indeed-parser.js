import $ from "jquery";
export class IndeedParser {
  static getCompany(data) {
    var capture = data.match(/<span.+?class=\"company.+?<\/span>/gm);
    return capture == null ? '' : capture[0].replace(/<.+?>/gm, '').trim();
  }

  static getLocation(data) {
    var capture = data.match(/location.+?</gm);
    return capture == null ? '' : capture[0].replace(/.*>/g, '').replace('<', '').trim();
  }

  static getDate(data) {
    var capture = data.match(/date.+?</gm);
    return capture == null ? '' : capture[0].replace(/.*>/g, '').replace('<', '').trim();
  }

  static getTitle(data) {
    var capture = data.match(/jobTitle.+?<\/a>/gm);
    return capture == null ? '' : capture[0].replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<\/a>/g, '').replace(/jobTitle\">/g, '').replace('&#039;', "'").trim();
  }

  static resolveDescription(url, prospect)  {
    return $.getJSON('http://allorigins.me/get?url=' + encodeURIComponent(url) + '&callback=?')
        .then(el=>{
            var capture = el.contents.replace(/\n/g, '').match(/class=\"{0,1}summary.+?<\/span>/gm);
            prospect.descriptionHTML = capture == null ? '<p style="text-align:center;">DESCRIPTION UNAVAILABLE</p>' : '<span ' + capture[0].trim();
        })
        .catch(err=>{console.log(err)})
  }

  static getTruncation(data) {
    var capture = data.match(/<span class=\"{0,1}summary.+?<\/span>/gm);
    return capture == null ? '' : capture[0].replace(/<span.+?>/g, '').replace(/<\/span>/g, '').replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/\&amp\;/g, '&').trim();
  }

  static async setDescription(data, query, prospect) {
    var url = this.getUrl(data, query);
    return await this.resolveDescription(url, prospect);
  }

  static getUrl(data, query) {
    var capture = data.match(/href=\".+?\"/gm);
    return capture == null ? '' : 'https://www.indeed.com/viewjob' + capture[0].replace('href="', '').replace('"', '').replace('/rc/clk', '').trim();
  }
}
