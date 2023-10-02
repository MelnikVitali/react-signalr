# Aspnet SignalR and React

You need dotnet 7.0 and Node.JS (and npm) to run this sample

## Running the code

You need to run the front end and backend separately.

---

### Fire up the Backend

Navigate to the backend folder `cd firstSignalrProject` and `cd secondSignalrProject`

Option 1 : open the project file in visual studio and run the project.
Option 2 : open a shell command line (ex. gitbash) and run `dotnet run`

It runs the app in the development mode.\
Open [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html) and
[https://localhost:5002/swagger/index.html](https://localhost:5002/swagger/index.html)
to view them in a browser.

We are not using the SayHello API but you can see that your app is up and running the signal hub is available on [https://localhost:5001/hub](https://localhost:5001/hub) and [https://localhost:5002/hub](https://localhost:5002/hub)
you get `Connection ID required` if you try to access it trough browser.

Two Hubs -->
First: Open [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html) to view it in the browser.

Second: Open [https://localhost:5002/swagger/index.html](https://localhost:5002/swagger/index.html) to view it in the browser.

### Fire up the FrontEnd

Navigate to the frontend folder `cd client` and run `yarn`or `npm i` to get the dependencies, followed by `npm start` or `yarn start`
It runs the app in the development mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

---

## Learn More

You can learn more in the [Aspnet SignalR and React](https://www.abrahamberg.com/blog/aspnet-signalr-and-react/)
