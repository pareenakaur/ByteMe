from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from classes.ReportManager import ReportManager

db = firestore.client()

reportsColl = db.collection('reports')

reportsAPI = Blueprint('reportsAPI',__name__)

@reportsAPI.route('/createReport', methods=['POST']) 
def createReport():
    try:
        resp = request.json
        res = ReportManager.createReport(resp["username"], resp["stallID"],resp["centreID"],resp["category"], resp["description"],resp["image"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/updateReport', methods=['POST']) 
def updateReport():
    try:
        resp = request.json
        res = ReportManager.updateReport(resp["reportID"], resp["category"],resp["description"],res["image"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/deleteReport', methods=['DELETE']) 
def deleteReport():
    try:
        resp = request.json
        res = ReportManager.deleteReport(resp["reportID"],resp["centreID"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/voteReport', methods=['POST']) 
def voteReport():
    try:
        resp = request.json
        res = ReportManager.voteReport(resp["username"], resp['reportID'],resp["upvote"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/getStallReports', methods=['GET']) 
def getStallReports():
    try:
        resp = request.args
        res,reports_list = ReportManager.getStallReports(resp["stallID"])
        if(res == "Success"):
            return jsonify({"result": res, "list":reports_list})
        else:
            return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"

@reportsAPI.route('/getUserReports', methods=['GET']) 
def getUserReports():
    try:
        resp = request.args
        res,reports_list = ReportManager.getUserReports(resp["username"])
        if(res == "Success"):
            return jsonify({"result": res, "list":reports_list})
        else:
            return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"


@reportsAPI.route('/getReport', methods=['GET']) 
def getReport():
    try:
        resp = request.args
        res = ReportManager.getReport(resp["reportID"])
        return jsonify({"result": res})
    except Exception as e:
        return f"An Error has Occured: {e}"