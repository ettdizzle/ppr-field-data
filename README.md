# Field Data Collection App
A web app for collecting data in the field. Uses AngularJS for data binding, Bootstrap classes for responsive UI, and Firebase to store the data.

Data is stored in nested JSON format. New observations are pushed into an array of observations for each plant.


## Develop and test locally
Clone the code
```
git clone https://github.com/ettdizzle/ppr-field-data.git
cd ppr-field-data
```

Install npm (node package manager): https://www.npmjs.com/

Install dependencies with npm
```
npm install
```

Start the development server
```
npm start
```

Browse to the app at http://localhost:8000/app/

## Deploy to Firebase
```
npm install -g firebase-tools
firebase deploy
```

URL: https://ppr-field-data.firebaseapp.com

Dashboard: https://ppr-field-data.firebaseio.com
