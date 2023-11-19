# 👋 Welcome to SC2006 SCS4, Team ByteMe Project. 

# Project Introduction

ByteMe! is a mobile application optimised for android to help Singaporeans gauge the crowd levels of hawker centres and provide hawker stall information in a single-tap! This app seeks to solve the poor user experience associated with queing for food/squeezing with the crowd by predicting crowd levels using LTA carpark availability API and redirect users to other hawker centres near them. By viewing the hawker stall information, users can also judge the quality of the food/service through reviews & reports left by other users within our app.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
1) Install necessary dependencies and packages
- Install python packages: pip install -r requirements.txt
- Install react-native packages: npm install 

2) Obtain a google cloud API key and create a .env file containing that key
- Get google cloud API key here (https://developers.google.com/workspace/guides/manage-credentials)
- Example of .env file:

3) (Use ANDROID phone) Syncing port used by expo to port used by localhost for server
- Enable developer mode on android phone (https://www.youtube.com/watch?v=GERlhgCcoBc)
- Running app on personal mobile device  (https://reactnative.dev/docs/running-on-device)
- Go to powershell terminal and run command: adb reverse tcp:5000 tcp:5000

4) Launching app on ANDROID phone
- Navigate to app folder and open 2 terminals
- 1st terminal: Run main.py in "backend\main.py"
- 2nd terminal: Run command npm run android

# Framework used
- Frontend: React Native, Expo
- Backend: Flask, Firebase

# APIs used
- Frontend: Google maps api, place details api, place nearby search api, LTA carpark availability API, Firebase API