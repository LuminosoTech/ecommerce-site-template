## What is the goal of this template?

Provide a free ecommerce template starter which uses the luminoso ecommerce api. Ecommerce related logic is abstracted using the [@luminoso/react-ecommerce-sdk](https://github.com/LuminosoTech/react-ecommerce-sdk). The sdk manages retreiving your products, customer sessions, getting shipping rates, tax calculation based on customer locations, payment, etc. Upon a new customer visiting your store, a unique session id is set in order to manage their cart, show past orders and more. 

## What is the goal of Luminoso

Provide an ecommerce solution which gives the option to individuals or companies to control all their data. Its combining multiple products into one (shopify, netlify, analytics, etc) and provide the option to self host all of it. The saas platform will be an option provided at [https://luminoso.tech/](https://luminoso.tech), which will be provided at a subscription price which could be customizable to your needs. 

For full self hosting, the customer facing website like this template are hosted without external solution such as netlify. Ex: [https://freshfoods-20bc983c.luminoso.tech/](https://freshfoods-20bc983c.luminoso.tech/). For the backend, the current architecture is comprised of two spring boot instances. One api gateway to route incoming traffic, used to easily map request to the correct service and simplifies retrieving files for hosted files. The second is the monolith core api process which manages all the ecommerce & hosting logic. Both are built on top of spring boot, running on java 16. It can be deployed using docker.

## Roadmap to releasing a Beta version of Luminoso

There's a few things to complete,

For this template, 

Things to be completed: 

- Cart screen, allowing customer to browse through paginated products, sort them by attributes, etc.
- Check out flow, improving the flow & completing the stripe integration for credit card input.  
- Overall ui / ux improvements

Things to be added: 

- order screen package tracking for physical products
- if stripe has been linked and set as the default payment provider, the checkout form credit card inputs are expected to use stripe react components. If other payment methods are enabled (apple pay, cryptocurrency, etc), abstractions will be made for them.

For the backend,

There's some decent amount of work left, adding product shipping rate redundancy (just in case one shipping provider fails...), supporting more payment providers & crypto.

For full self hosting, ideally have an automated upading system similar to jenkins. To allow indivituals / companies to easily get updates.

## Interested in Beta testing Luminoso?

Any feedback on the sdk experience, saas product, this template are welcome. Developer feedback could range from sdk method names to finding a bug. Any issues found are welcomed. If you or someone you know is interested in using Luminoso as your ecommerce provider, message me at fabrizio.rodinmiron@luminoso.tech. I could notify everyone once the product is ready to launch. At the moment, im not looking for huge growth, just to create an awesome and stable alternative to existing solutions to give people the option of owning their data.

## Questions or comments

If you have any questions or feedback (good or bad), send it at fabrizio.rodinmiron@luminoso.tech. If your interested in helping out or creating another template / integrating an existing template with the Luminoso api, we will definitly showcase the template and look into monetizing. I appreciate any time someone decides to put The luminoso team is mostly comprised on one person atm, me :D, so updates are expected to be on a slow cycle since this isn't my full time job, but hopefully one day it does become my full time job. I would love to hire a bunch of awesome people, like you :D, to help out with development.
