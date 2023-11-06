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

@userAPI.route('/login', methods=['GET'])
def login():
    try:
        resp = request.args
        res = AccountManager.validateLogin(resp["username"],resp["password"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error Occured: {e}"
    
@userAPI.route('/list')
def read():
    try:
        all_users = [doc.to_dict() for doc in usersColl.stream()]
        return jsonify(all_users)
    except Exception as e:
        return f"An Error has Occured: {e}"
    
        