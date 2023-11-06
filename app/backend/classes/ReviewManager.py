from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import datetime

db = firestore.client()

reviewsColl = db.collection('reviews')

class ReviewManager(object):

    def createReview(username,stallID,description):
        if(not ReviewManager.validateReview(username,stallID)):
            reviewsColl.document().set({"username": username, "stallID": stallID, "description": description,  "votes": 0})
            return "Success"
        else:
            return "user has already reviewed the stall"

    def updateReview(username,stallID,description):
        if(ReviewManager.validateReview(username,stallID)):
            review = reviewsColl.where("username","==",username).where("stallID","==",stallID).get()
            key = review[0].id
            reviewsColl.document(key).update({"description":description}) 
            return "Success"
        else:
            return "Review does not exist"    
        
    
    def voteReview(username,stallID,upvote:bool):
        if(ReviewManager.validateReview(username,stallID)):
            review = reviewsColl.where("username","==",username).where("stallID","==",stallID).get()
            key = review[0].id
            if(upvote):
                reviewsColl.document(key).update({"votes": firestore.Increment(1)})
            else:
                reviewsColl.document(key).update({"votes": firestore.Increment(-1)})
            return "Success"
        else:
            return "Review does not exist"
    
    def deleteReview(username, stallID):
        if(ReviewManager.validateReview(username,stallID)):
            review = reviewsColl.where("username","==",username).where("stallID","==",stallID).get()
            key = review[0].id
            reviewsColl.document(key).delete()
            return "Success"
        else:
            return "Review does not exist"
            


    def validateReview(username,stallID):
        review = reviewsColl.where("username","==",username).where("stallID","==",stallID).get()
        if(review==[]):
            return False
        else:
            return True
    
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