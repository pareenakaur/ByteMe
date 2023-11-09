from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import datetime
from classes.AccountManager import AccountManager

db = firestore.client()

reviewsColl = db.collection('reviews')

class ReviewManager(object):

    def createReview(username,stallID,rating,description):
        if(ReviewManager.validateCreateReview(username,stallID)):
            _, review = reviewsColl.add({"username": username, "stallID": stallID, "rating": rating,"description": description,  "votes": 0})
            return review.id
        else:
            return "user has already reviewed the stall"

    def updateReview(username,stallID,reviewID,description):
        if(ReviewManager.validateReview(reviewID)):
            reviewsColl.document(reviewID).update({"description":description}) 
            return "Success"
        else:
            return "Review does not exist"    
        

    def voteReview(username,stallID,reviewID,upvote):
        if(ReviewManager.validateReview(reviewID)):
            voteUpdate = AccountManager.voteReview(username,stallID,reviewID,upvote)
            print("voteUpdate = " ,voteUpdate)
            reviewsColl.document(reviewID).update({"votes": firestore.Increment(voteUpdate)})
            return "Success"
        else:
            return "Review does not exist"

    def deleteReview(reviewID):
        if(ReviewManager.validateReview(reviewID)):
            review = reviewsColl.document(reviewID).delete()
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
        reviews_list = reviewsColl.where("stallID","==",stallID).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                res_list.append(doc.to_dict())
            return ("Success", res_list)
        else:
            return ("Stall has no reviews", [])
    
    def getUserReviews(username):
        reviews_list = reviewsColl.where("username", "==", username).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                res_list.append(doc.to_dict())
            return ("Success", res_list)
        else:
            return ("User has no reviews", [])