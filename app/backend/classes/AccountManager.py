import datetime
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from classes.User import User

db = firestore.client()
usersColl = db.collection('users')
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
        user_dict = usersColl.document(username).get().to_dict()
        user = User( user_dict["userID"], username, user_dict["email"], user_dict["password"], user_dict["createdDate"])
        return user
    
    def addFavouriteStall(username, stallID):
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"votes": firestore.ArrayUnion([stallID])})
            return "Success"
        else:
            return "Username does not exist"
    
    def resetPassword(username, password):
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"password": password})
            return "Success"
        else:
            return "Username does not exist"
    

