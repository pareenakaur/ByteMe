from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()

reviewsColl = db.collection('reviews')
reportsColl = db.collection('reports')
class ShopFeedbackManager(object):
    def getFeedback(userID,stallID,review):
        # query user AccountManager.getUser(userID)
        # get review/report list
        pass

    def getShopFeedback(stallID,review):
        # query stall HawkerManager.getStallInfo(stallID)
        # stall's review/report list
        pass

    def createReport(userID,stallID):
        # need userID,stallID,description,description
        # add feedback to database
        pass

    def updateReport(userID,stallID):
        #  get report 
        #  update data
        #  insert back report
        pass
    
    def voteReport(userID,stallID,upvote:bool):
        # get report 
        # update vote counter
        # insert back report
        pass

    def createReview(userID,stallID):
        # need userID,stallID,description,description
        # add feedback to database
        pass

    def updateReview(userID,stallID):
        #  get report
        #  update data
        #  isnert back report
        pass
    
    def voteReport(userID,stallID,upvote:bool):
        # get review
        # update vote counter
        # insert back review
        pass

    def getUserFeedback(userID, review):
        # query user
        # get review/report list
        pass
