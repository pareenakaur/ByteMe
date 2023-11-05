import datetime
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()
usersColl = db.collection('users')
class AccountManager(object):
    
    def validateRegister(username, password, email):
        # query database
        # if (username == and password == and email == ) return true
        pass

    def registerUser(self,username,password,email):
        if(self.validateRegister(username,password,email)==True):
            createdDate = datetime.datetime.now()
            # usersColl.set(id).
            # numUsers = querydatabase()
            # newUser = User(numUsers, username, email, password, createdDate)
            # add to database
        else:
            print("Error")
    
    def validateLogin(username,password):
        #query database
        #if(username== and password ==) return True
        pass

    def login():
        # input username and password
        pass

    def vote(userID,stallID,upvote):
        # numvotes = query database
        # newVote = Vote(userID,stallID,numvotes,upvote)
        pass

    def getUser(userID):
        # query database
        # return user
        pass

