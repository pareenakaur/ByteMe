import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from ShopFeedbackManager import ShopFeedbackManager

db = firestore.client()

reportsColl = db.collection('reports')

reportsAPI = Blueprint('reportsAPI',__name__)

# @reviewsAPI.route('/get', methods=['GET'])
# def get():
#     try:
#         id = uuid.uuid4()
#         usersColl.document(id.hex).set(request.json)
#         return jsonify({"success": True})
#     except Exception as e:
#         return f"An Error Occured: {e}"
    
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

@reportsAPI.route('/getShopReports') 
def read():
    try:
        resp = request.json
        reports_list = ShopFeedbackManager.getShopReports(resp["stallID"])
        return jsonify(reports_list)
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/getUserReports') 
def read():
    try:
        resp = request.json
        reports_list = ShopFeedbackManager.getUserReports(resp["stallID"])
        return jsonify(reports_list)
    except Exception as e:
        return f"An Error has Occured: {e}"
    
@reportsAPI.route('/createReport') 
def read():
    try:
        resp = request.json
        res = ShopFeedbackManager.createReport(resp["username"], resp["stallID"], resp["description"])
        if(res==True):
            return True
        else:
            print("Error")
        # return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/updateReport') 
def read():
    try:
        resp = request.json
        res = ShopFeedbackManager.updateReport(resp["username"], resp["stallID"], resp["description"])
        if(res==True):
            return True
        else:
            print("Error")
        # return jsonify(reviews_list)
    except Exception as e:
        return f"An Error has Occured: {e}"