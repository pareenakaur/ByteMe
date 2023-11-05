import uuid
from flask import Blueprint, request, jsonify
from firebase_admin import firestore

db = firestore.client()

usersColl = db.collection('users')

# Adding documents with auto IDs
data = {'name': 'John Smith','age':40, 'employed': True}
data1 = {'name': 'Jane Doe','age':12, 'employed': False}
# usersColl.add(data1)
# usersColl.add({'name:': 'John Smith','age':40, 'employed': True})
# usersColl.document('janedoe').set(data1) #document reference id, add a document's name as 'jandoe'

# Merging, updating
# usersColl.document('janedoe').set({'address': 'London'},merge= True) #document reference id, add a document's name as 'jandoe'

#set document with autoids
# db.collection('user').document().set(data)

# collection within document
# usersColl.document('janedoe').collection('reviews').add({'name':'Avengers'}) #document reference id, add a document's name as 'jandoe'

# usersColl.document('janedoe').collection('reviews').document('Spiderman').set({'name': 'spiderman'}) #document reference id, add a document's name as 'jandoe'

# user_Ref = db.collection('users')

userAPI = Blueprint('userAPI',__name__)

@userAPI.route('/get', methods=['GET'])
def get():
    try:
        # id = uuid.uuid4()
        # usersColl.document(id.hex).set(request.json)
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occured: {e}"
    
@userAPI.route('/add', methods=['POST'])
def create():
    try:
        # id = uuid.uuid4()
        resp = request.json
        
        usersColl.document(resp['username']).set(resp)
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occured: {e}"
    
@userAPI.route('/list')
def read():
    try:
        all_users = [doc.to_dict() for doc in usersColl.stream()]
        return jsonify(all_users)
    except Exception as e:
        return f"An Error has Occured: {e}"
    
        