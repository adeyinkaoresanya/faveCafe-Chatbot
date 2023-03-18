## FaveCafe's

This is a chatbot built for a restaurant using nodejs and socket.io as an exam project from <a href="https://altschoolafrica.com/schools/engineering">AltSchool Africa</a>.

## Requirements

1. ChatBot interface would be like a chat interface
2. Ability to store user session based on devices
3. When a customer lands on the chatbot page, the bot should send these options to the customer:
*  Select 1 to Place an order
*  Select 99 to checkout order
* Select 98 to see order history
* Select 97 to see current order
* Select 0 to cancel order

4. When a customer selects “1”, the bot should return a list of items from the restaurant. It is up to you to create the items in your restaurant for the customer. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.

5. When a customer selects “99” out an order, the bot should respond with “order placed” and if none the bot should respond with “No order to place”. Customer should also see an option to place a new order
6. When a customer selects “98”, the bot should be able to return all placed order
7. When a customer selects “97”, the bot should be able to return current order
8. When a customer selects “0”, the bot should cancel the order if there is.


## Tools Used

---

-   Node.js
-   Express.js
-   MongoDB
-   Socket.IO

## Set up

- Install [Node.js](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/docs/manual/installation/)
- Install project dependencies
- clone this repo
- update env with example.env
- run `npm run start:dev`


### How to clone this repo

```sh
git clone https://github.com/adeyinkaoresanya/faveCafe-Chatbot.git
```

### Install project dependencies

```sh
npm install
```

### Update .env with example.env

### Run a development server

```sh
npm run start:dev
```


## Usage

-   Head over to the chatbot  [site](https://)


-   On welcoming you to the site, you will be asked to type START to continue.
-   Afterwards a menu of options will appear where you can select:
    -  1 to place an order

    -  99 to checkout your order 

    -  98 to check order history

    -  97 to check your current order

    -  0 to cancel your order
   
-  On selecting 1 to place an order, a list of available food options and their corresponding prices will appear. Select the appropriate code to order a food item.
