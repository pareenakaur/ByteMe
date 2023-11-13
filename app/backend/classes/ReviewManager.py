from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import datetime
from classes.AccountManager import AccountManager
from utils.functions import delete_collection,boolDiff
from firebase_admin.firestore import SERVER_TIMESTAMP

db = firestore.client()

reviewsColl = db.collection('reviews')

class ReviewManager(object):

    def createReview(username,stallID,rating,description):
        if(ReviewManager.validateCreateReview(username,stallID)):
            _, review = reviewsColl.add({"username": username, "stallID": stallID, "rating": rating,"description": description,
                                         "votes": 0, "timestamp": SERVER_TIMESTAMP})
            ReviewManager.addHawkerReview(stallID,review.id)
            return review.id
        else:
            return "user has already reviewed the stall"

    def updateReview(reviewID,rating,description):
        if(ReviewManager.validateReview(reviewID)):
            reviewsColl.document(reviewID).update({"rating":rating,"description":description}) 
            return "Success"
        else:
            return "Review does not exist"    


    def deleteReview(reviewID):
        if(ReviewManager.validateReview(reviewID)):
            review = reviewsColl.document(reviewID).get()
            reviewDict = review.to_dict()
            res = reviewsColl.document(reviewID).delete()
            ReviewManager.deleteHawkerReview(reviewDict["stallID"],review.id)
            return "Success"
        else:
            return "Review does not exist"
            

    def validateReview(reviewID):
        review = reviewsColl.document(reviewID).get()
        if review.exists:
            return True
        else:
            return False

    # can't create review if user has already reviewed the stall
    def validateCreateReview(username, stallID):
        review = reviewsColl.where("stallID","==",stallID).where("username","==",username).get()
        if len(review) == 0:
            return True
        else:
            return False

    def getStallReviews(stallID):
        reviews_list = reviewsColl.where("stallID","==",stallID).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                review = doc.to_dict()
                review['reviewID'] = doc.id 
                res_list.append(review)
            return ("Success", res_list)
        else:
            return ("Stall has no reviews", [])
    
    def getUserReviews(username):
        reviews_list = reviewsColl.where("username", "==", username).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                review = doc.to_dict()
                review['reviewID'] = doc.id 
                res_list.append(review)
            return ("Success", res_list)
        else:
            return ("User has no reviews", [])

    def getAvgReviewRating(stallID):
        avgRating,totalRating = 0,0
        reviews_list = reviewsColl.where("stallID", "==", stallID).get()
        if(len(reviews_list) != 0):
            for doc in reviews_list:
                review = doc.to_dict()
                totalRating += review.get('rating')
            avgRating = totalRating / len(reviews_list)
            return avgRating
        else:
            return ("User has no reviews")
    
    def getReviewCount(stallID):
        avgRating,totalRating = 0,0
        reviewLength = reviewsColl.where("stallID", "==", stallID).count().get()
        return reviewLength[0][0].value

    def voteReview(username,reviewID,upvote):
        if(ReviewManager.validateReview(reviewID)):
            voteUpdate = ReviewManager.updateVote(username,reviewID,upvote)
            print("voteUpdate = " ,voteUpdate)
            reviewsColl.document(reviewID).update({"votes": firestore.Increment(voteUpdate)})
            return "Success"
        else:
            return "Review does not exist"
    
    def updateVote(userID,reviewID,upvote):
        query = reviewsColl.document(reviewID).collection('votes').document(userID).get()
        if query.exists == 0 :
            if upvote == None:
                return 0
            reviewsColl.document(reviewID).collection('votes').document(userID).set({"upvote": upvote})
            voteUpdate = boolDiff(upvote,None)
            return voteUpdate
        
        vote = query.to_dict().get("upvote")
        # vote variable is the before value of review vote, upvote is the updating value
        voteUpdate = boolDiff(upvote,vote)
        if upvote == None:
            reviewsColl.document(reviewID).collection('votes').document(userID).delete()
        else:
            reviewsColl.document(reviewID).collection('votes').document(userID).update({"upvote": upvote})
        
        return voteUpdate

    def deleteReviewVotes(reviewID):
        votesColl = reviewsColl.document(reviewID).collection('votes')
        delete_collection(votesColl,10)
    
    def addHawkerReview(self, centreID,reviewID):
        hawkerCentreLocationsColl = db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayUnion([reviewID])})
        return

    def deleteHawkerReview(self,centreID,reviewID):
        hawkerCentreLocationsColl = db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayRemove([reviewID])})
        return
