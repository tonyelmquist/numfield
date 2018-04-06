

## NUMBER FIELD DEMO

A very simple React application that lets you view choose a pair of currencies and enter an exchange rate.

## NOTES:

I chose to use an off-the-shelf masked input field; initially I tried formatting the X characters differently, but that proved unwieldy, so instead I layered 2 inputs over each other, and passed the state to both, one with spaces for placeholders, one with Xs. The only problem with this was that when I intercept the . character to indicated that the user has finished entering integers (if it's shorter than the format), updating the input is placing the cursor at the end. I started trying to do this a different way, but decided it was getting a little hacky and left it as-is.

Likewise with handling paste - I started to work on handling different decimal lengths, but decided I was spending too much time on it and just let it be :)

I chose 3 obscure currencies so it wouldn't be jarring that the rates don't make sense :)

## SETUP

To run the app, first run

    npm install  

and then start the app by running

    npm run start

this will start a webpack dev server to serve up the local files, and should open your browser to http://localhost:8080 to view the miniapp.

That's it!


