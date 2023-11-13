import datetime
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from utils.functions import boolDiff
import googlemaps
# from google.cloud.firestore_v1.base_query import FieldFilter

db = firestore.client()
usersColl = db.collection('users')
gmaps = googlemaps.Client(key='AIzaSyB4OexlmStr943doK3Cjo15V8FnSI0dNQk')
class AccountManager(object):
    
    def validateUsername(username):
        user_dict = usersColl.document(username).get().to_dict()
        if (user_dict == None): # Username must be unique, password and email need not be unique
            return True
        else:
            return False

    def registerUser(username,password,email):
        if(AccountManager.validateUsername(username)):
            createdDate = datetime.datetime.now()
            usersColl.document(username).set({"username": username, "password": password, "email": email, "createdDate": createdDate,\
                                              "favourites": []})
            return "Success"
        else:
            return "username Taken"
    
    def validateLogin(username,password):
        user_dict = usersColl.document(username).get().to_dict()
        if(user_dict == None):
            return "Invalid username"
        elif(password == user_dict["password"]):
            return "Success"
        else:
            return "Wrong password"

    def getUser(username):
        if (not AccountManager.validateUsername(username)):
            user_dict = usersColl.document(username).get().to_dict()
            return ("Success", user_dict)
        else:
            return ("Username does not exist",{})
    
    def addFavouriteStall(username, stallID):
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"favourites": firestore.ArrayUnion([stallID])})
            return "Success"
        else:
            return "Username does not exist"
        
    def removeFavouriteStall(username, stallID):
        if(not AccountManager.validateUsername(username)):
            user_dict = usersColl.document(username).get().to_dict()
            if(stallID in user_dict["favourites"]):
                usersColl.document(username).update({"favourites": firestore.ArrayRemove([stallID])})
                return "Success"
            else:
                return "stallID not in favourites list"
        else:
            return "Username does not exist"
        
    def getFavouriteStalls( userID, format):
        from api.hawkersAPI import hawkerManager
        user_dict = usersColl.document(userID).get().to_dict()
        favourite_ids = user_dict['favourites']

        favourite_stalls = []
        for id in favourite_ids:
            favourite_stalls.append(hawkerManager.getStallInfo(id, format))
        return favourite_stalls
    
    def resetPassword(username, password):
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"password": password})
            return "Success"
        else:
            return "Username does not exist"

