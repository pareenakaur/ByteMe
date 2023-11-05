import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from ShopFeedbackManager import ShopFeedbackManager

db = firestore.client()

reviewsColl = db.collection('reviews')

reviewsAPI = Blueprint('reviewsAPI',__name__)

@reviewsAPI.route('/get', methods=['GET'])
def get():
    try:
        #id = uuid.uuid4()
        #usersColl.document(id.hex).set(request.json)
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occured: {e}"
    
# @reviewsAPI.route('/add', methods=['POST'])
# def create():
#     try:
#         id = uuid.uuid4()
#         usersColl.document(id.hex).set(request.json)
#         return jsonify({"success": True})
#     except Exception as e:
#         return f"An Error Occured: {e}"
    
# @reviewsAPI.route('/list') # by hawker id
# def read():
#     try:
#         all_users = [doc.to_dict() for doc in usersColl.stream()]
#         return jsonify(all_users)
#     except Exception as e:
#         return f"An Error has Occured: {e}"
    
@reviewsAPI.route('/getShopReviews') 
def read():
    try:
        resp = request.json
        reviews_list = ShopFeedbackManager.getShopReviews(resp["stallID"])
        return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/getUserReviews') 
def read():
    try:
        resp = request.json
        reviews_list = ShopFeedbackManager.getUserReviews(resp["username"])
        return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"
    
@reviewsAPI.route('/createReview') 
def read():
    try:
        resp = request.json
        res = ShopFeedbackManager.createReview(resp["username"], resp["stallID"], resp["description"])
        if(res==True):
            return True
        else:
            print("Error")
        # return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"

@reviewsAPI.route('/updateReview') 
def read():
    try:
        resp = request.json
        res = ShopFeedbackManager.updateReview(resp["username"], resp["stallID"], resp["description"])
        if(res==True):
            return True
        else:
            print("Error")
        # return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"
        