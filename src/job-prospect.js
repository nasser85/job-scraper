export class JobProspect {
  constructor(company, location, date, job, url, description, truncated, _data) {
    this.company = company;
    this.location = location;
    this.date = date;
    this.job = job;
    this.url = url;
    this.truncatedDescription = truncated;
    this.descriptionHTML = description;
    this._data = _data;
  }
}