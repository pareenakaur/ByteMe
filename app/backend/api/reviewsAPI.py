import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from classes.ReviewManager import ReviewManager

db = firestore.client()

reviewsColl = db.collection('reviews')

reviewsAPI = Blueprint('reviewsAPI',__name__)

@reviewsAPI.route('/createReview', methods=['POST']) 
def createReview():
    try:
        resp = request.json
        res = ReviewManager.createReview(resp["username"], resp["stallID"], resp["description"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/updateReview', methods=['POST']) 
def updateReview():
    try:
        resp = request.json
        res = ReviewManager.updateReview(resp["username"], resp["stallID"], resp["description"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/voteReview', methods=['POST']) 
def voteReview():
    try:
        resp = request.json
        res = ReviewManager.voteReview(resp["username"], resp["stallID"], resp["upvote"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/deleteReview', methods=['POST']) 
def deleteReview():
    try:
        resp = request.json
        res = ReviewManager.deleteReview(resp["username"], resp["stallID"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/getStallReviews', methods=['GET']) 
def getStallReviews():
    try:
        resp = request.args
        res,reviews_list = ReviewManager.getStallReviews(resp["stallID"])
        if(res == "Success"):
            return jsonify({"result": res, "list":reviews_list})
        else:
            return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/getUserReviews', methods=['GET']) 
def getUserReviews():
    try:
        resp = request.args
        res,reviews_list = ReviewManager.getUserReviews(resp["username"])
        if(res == "Success"):
            return jsonify({"result": res, "list":reviews_list})
        else:
            return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"
        