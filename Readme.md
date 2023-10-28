
# Online Shop

## To start Python server

- Open the project in VS Code and in the terminal run
 
> env/Scripts/activate

- This is to activate the python virtual environment.
- Make sure PosegreSql is configured inside the settings.py file in the cart_manage folder inside the project folder and run the following

>python manage.py makemigrations

>python manage.py migrate

- After the environment is activated run 

> python manage.py runserver

## To Start the development server

- Open the cart folder in a separate VS Code window or cd into the cart direcctory from a new terminal and run

> npm start

- This will start the development server.
- On opening the start page will be a home page where the user will see all available products.
- If the user wishis to place an order he/she has to login.
- The admin and user login is from the same login page. if the user enters the admin email address he/she will be loggedin as an admin.
- p.s. During logins the password isn't checked in this project and only the email address can be used. Later the use of password with email can be done.

## User Logged in

- When the user logs in he can get the option of adding the products to cart by clicking the add to cart button.
- On clicking this button the item will be removed from the cart.
- If the user wishes to check his/her cart they have to click on the top right button and click on My Cart.
- In the cart page the user an review the products they will be checking out and delete and product from the cart here.
- If the user wishes to checkout with the selected products in their cart they can click the confirm order button and checkout.
- After the user chcks out a log is maintained in the database for the admin to check later.
- The user can logout using the logout option in the top right menu.

## Admin Logged in

- When the user logs in as an admin they will see the list of products if they had added earlier.
- Here the admin can delete any product that they wish to stop selling.
- If the admin wants to add a new product they have to go to the menu to the top right corner same as the one in the user's page and click on Add Products.
- In the Add Products they can add as many products as they want but it will have to be one at a time.
- In the admin's homepage all products including the unavailable ones will be shown.

### Parts of the project left to be done

- Logging in with a password.
- Displaying the list of orders in the admin panel.
- Editing the product details like the availability, etc by the admin.
- The left menu drawer is glitchy and need a fix.
- Improvement in the UI.
