# Job Scraper
#### Scrape job posts from *Indeed* and *Monster* client side!
## Getting Started
In the terminal ...
```bash
npm install job-scraper
```

In your script file, simply import and initialize the ``job-scraper``.  
```javascript
import JobScraper from 'job-scraper';
```

The job scraper takes in the following *three* arguments
* Search query, job title or related key words
* City
* State
For Example...
```javascript
const args = ['Pizza Delivery', 'New York', 'New York'] 
const jobScraper = new JobScraper(...args);
```

The ``init`` function returns a promise with which you can work with...
```javascript
const scraped = jobScraper.init();
scraped.then(res=>{
    //do something with the res
})
```
