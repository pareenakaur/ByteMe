import datetime
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from classes.User import User

db = firestore.client()
usersColl = db.collection('users')
class AccountManager(object):
    
    def validateRegister(username, password, email):
        user_dict = usersColl.document(username).get().to_dict()
        if (usersColl.document(username).get().to_dict() == None): # Username must be unique, password and email need not be unique
            return True
        else:
            return False

    def registerUser(username,password,email):
        if(AccountManager.validateRegister(username,password,email)==True):
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

    def vote(userID,stallID,upvote):
        # numvotes = query database
        # newVote = Vote(userID,stallID,numvotes,upvote)
        pass

    def getUser(username):
        user_dict = usersColl.document(username).get().to_dict()
        print(user_dict)
        user = User( user_dict["userID"], username, user_dict["email"], user_dict["password"], user_dict["createdDate"])
        return user
    

