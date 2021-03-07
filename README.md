# air-quality-app-personal-proj
Just a practice and non-profit project for the Start2Impact web development course.
The API I'm using is the one of [The World Air Quality Project](https://aqicn.org/api/).

## How to build the app on your computer

You should first install Webpack in your project directory with these two terminal commands:

```
npm init -y
npm install webpack webpack-cli --save-dev
```

Then you should install the two libraries that I'm currently using for this project (Lodash and Jquery).
You can do it with the commands:

```
npm install --save lodash
npm install jquery
```

Then you should add your personal token for the API to work correctly and insert it in an .env file,
like in the example file in .env_example.

And last, you should run this command in your terminal to make your local webpack build of my project:

```
npm run build
```
