# Why I switched from Mongo to PostgreSQL

The initial version of Social, not Social used Mongo and Mongoose because it was a technology that many blogs and learning sites used in their example docs. However, as the app grew, a few problems emerged.
* Most of the data should be normalized. I had experience with SQL databases and the more the tables grew, the more I internally cringed every time I built "normalization" into the ORM.
* Most importantly, paging was difficult to non-existent. Skipping is a core feature of every SQL engine I've ever used and having to promise my way through Mongoose's paging solution was painful.

In the end I decided that it was just a better fit for SQL over document database. I'd still love to have a project using Mongo as I think it and it's siblings (esp. CouchDB) are interesting for the right problem. This just was not it.