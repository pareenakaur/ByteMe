import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from classes.AccountManager import AccountManager

db = firestore.client()

usersColl = db.collection('users')

userAPI = Blueprint('userAPI',__name__)


@userAPI.route('/register', methods=['POST'])
def register():
    try:
        resp = request.json
        res = AccountManager.registerUser(resp["username"],resp["password"],resp["email"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"

@userAPI.route('/login', methods=['POST'])
def login():
    try:
        resp = request.json
        res = AccountManager.validateLogin(resp["username"],resp["password"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"

@userAPI.route('/addFavouriteStall', methods=['GET'])
def addFavouriteStall():
    try:
        resp = request.args
        res = AccountManager.addFavouriteStall(resp["username"],resp["stallID"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"

@userAPI.route('/removeFavouriteStall', methods=['GET'])
def removeFavouriteStall():
    try:
        resp = request.args
        res = AccountManager.removeFavouriteStall(resp["username"],resp["stallID"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"

@userAPI.route('/getFavouriteStalls', methods=['GET'])
def getFavouriteStalls():
    userID = request.args.get('id')
    format = request.args.get('format')

    if userID is None:
        return "Please provide a 'id' query parameter", 400
    
    else:
        favourite_stalls = AccountManager.getFavouriteStalls(userID, format)
        return jsonify(favourite_stalls)
    
@userAPI.route('/resetPassword', methods=['POST'])
def resetPassword():
    try:
        resp = request.json
        res = AccountManager.resetPassword(resp["username"],resp["password"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"

@userAPI.route('/getUser', methods=['GET'])
def getUser():
    try:
        resp = request.args
        res,user_details = AccountManager.getUser(resp["username"])
        return jsonify({"result": res, "user_details":user_details})
    except Exception as e:
        return f"An Error Occured: {e}"
    
# @userAPI.route('/list', methods=['GET'])
# def read():
#     try:
#         all_users = [doc.to_dict() for doc in usersColl.stream()]
#         return jsonify(all_users)
#     except Exception as e:
#         return f"An Error has Occured: {e}"
    
        