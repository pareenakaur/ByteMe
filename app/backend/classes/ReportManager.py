from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import datetime

db = firestore.client()

reportsColl = db.collection('reports')
class ReportManager(object):

    def createReport(username,stallID,description):
        if(not ReportManager.validateReport(username,stallID)):
            reportsColl.document().set({"username": username, "stallID": stallID, "description": description})
            return "Success"
        else:
            return "user has already reported the stall"

    def updateReport(username,stallID,description):
        if(ReportManager.validateReport(username,stallID)):
            report = reportsColl.where("username","==",username).where("stallID","==",stallID).get()
            key = report[0].id
            reportsColl.document(key).update({"description":description}) 
            return "Success"
        else:
            return "Report does not exist"    
        
    
    # def voteReport(username,stallID,upvote:bool):
    #     if(ReportManager.validateReport(username,stallID)):
    #         report = reportsColl.where("username","==",username).where("stallID","==",stallID).get()
    #         key = report[0].id
    #         if(upvote):
    #             reportsColl.document(key).update({"votes": firestore.Increment(1)})
    #         else:
    #             reportsColl.document(key).update({"votes": firestore.Increment(-1)})
    #         return "Success"
    #     else:
    #         return "Report does not exist"
    
    def deleteReport(username, stallID):
        if(ReportManager.validateReport(username,stallID)):
            report = reportsColl.where("username","==",username).where("stallID","==",stallID).get()
            key = report[0].id
            reportsColl.document(key).delete()
            return "Success"
        else:
            return "Report does not exist"
            


    def validateReport(username,stallID):
        report = reportsColl.where("username","==",username).where("stallID","==",stallID).get()
        if(report==[]):
            return False
        else:
            return True
    
    def getStallReports(stallID):
        reports_list = reportsColl.where("stallID","==",stallID).get()
        if(reports_list!=[]):
            res_list = []
            for doc in reports_list:
                res_list.append(doc.to_dict())
            return ("Success", res_list)
        else:
            return ("Stall has no reports", [])
    
    def getUserReports(username):
        reports_list = reportsColl.where("username", "==", username).get()
        if(reports_list!=[]):
            res_list = []
            for doc in reports_list:
                res_list.append(doc.to_dict())
            return ("Success", res_list)
        else:
            return ("User has no reports", [])