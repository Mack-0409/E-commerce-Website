Arch Switch 
Currently every listing is hardcoded in files that's wrong 
- create monogo models for the data to be stored
- Run the app once so that models get created in server
- Scrap out all hardcoded data and seed it into database 
  - For Images use url currently all the images are used from the public folder so use `/image.png' and then if user wants to add images he provide url of image
- in Backend create public routes for fetching those data
- remove all hardcoded data from frontend
- in frontend whenever user loads page  
  - it should show initial data and skeletons for loading data
  - once data loads show data

Create a new Admin Page (/admin) where only emails which are in admin array can access that page 
- admins must see orders, enquiries and allow to preform all CRUD operations on data.
- it should allow user to add/edit/delete a watch listing 
- Dyanmically generated stats should be shown in as well