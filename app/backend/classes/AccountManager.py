import datetime
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from utils.functions import boolDiff

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

    def voteReview(userID,stallID,reviewID,upvote):
        query = usersColl.document(userID).collection('votes').document(reviewID).get()
        if query.exists == 0 :
            if upvote == None:
                return 0
            usersColl.document(userID).collection('votes').document(reviewID).set({"stallID":stallID, "upvote": upvote})
            voteUpdate = boolDiff(upvote,None)
            return voteUpdate
        
        vote = query.to_dict().get("upvote")
        # vote variable is the before value of review vote, upvote is the updating value
        voteUpdate = boolDiff(upvote,vote)
        if upvote == None:
            usersColl.document(userID).collection('votes').document(reviewID).delete()
        else:
            usersColl.document(userID).collection('votes').document(reviewID).update({"upvote": upvote})
            

        return voteUpdate

    def voteReport(userID,stallID,reportID,upvote):
        query = usersColl.document(userID).collection('votes').document(reportID).get()
        if query.exists == 0 :
            if upvote == None:
                return 0
            usersColl.document(userID).collection('votes').document(reportID).set({"stallID":stallID, "upvote": upvote})
            voteUpdate = boolDiff(upvote,None)
            return voteUpdate
        
        vote = query.to_dict().get("upvote")
        # vote variable is the before value of review vote, upvote is the updating value
        voteUpdate = boolDiff(upvote,vote)
        if upvote == None:
            usersColl.document(userID).collection('votes').document(reportID).delete()
        else:
            usersColl.document(userID).collection('votes').document(reportID).update({"upvote": upvote})
            

        return voteUpdate

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
    
    def resetPassword(username, password):
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"password": password})
            return "Success"
        else:
            return "Username does not exist"
    

