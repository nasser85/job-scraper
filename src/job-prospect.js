export class JobProspect {
  constructor(company, location, job, url, description, truncated, _data) {
    this.company = company;
    this.location = location;
    this.job = job;
    this.url = url;
    this.truncatedDescription = truncated;
    this.descriptionHTML = description;
    this._data = _data;
  }
}