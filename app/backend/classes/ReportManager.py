from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import datetime
from classes.AccountManager import AccountManager
from utils.functions import delete_collection,boolDiff
from firebase_admin.firestore import SERVER_TIMESTAMP

db = firestore.client()

reportsColl = db.collection('reports')
class ReportManager(object):

    def createReport(username,stallID,category,description):
        if(ReportManager.validateCreateReport(username,stallID)):
            _, report = reportsColl.add({"username": username, "stallID": stallID, "description": description
                                         ,"category": category,  "votes": 0, "timestamp": SERVER_TIMESTAMP})
            ReportManager.addHawkerReport(stallID,report.id)
            return report.id
        else:   
            return "user has already reported the stall"

    def updateReport(reportID,category,description):
        if(ReportManager.validateReport(reportID)):
            report = reportsColl.document(reportID).update({"category": category,"description": description})
            return "Success"
        else:
            return "Report does not exist"    

    def deleteReport(reportID):
        if(ReportManager.validateReport(reportID)):
            report = reportsColl.document(reportID).get()
            reportDict = report.to_dict()
            res = reportsColl.document(reportID).delete()
            ReportManager.deleteHawkerReport(reportDict["stallID"],report.id)
            return "Success"
        else:
            return "Report does not exist"   
            


    def validateReport(reportID):
        report = reportsColl.document(reportID).get()
        if report.exists:
            return True
        else:
            return False

# can't create report if user has already reported the stall
    def validateCreateReport(username, stallID):
        report = reportsColl.where("stallID","==",stallID).where("username","==",username).get()
        if len(report) == 0:
            return True
        else:
            return False
    
    def getStallReports(stallID):
        reports_list = reportsColl.where("stallID","==",stallID).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reports_list!=[]):
            res_list = []
            for doc in reports_list:
                report = doc.to_dict()
                report['reportID'] = doc.id 
                res_list.append(report)
            return ("Success", res_list)
        else:
            return ("Stall has no reports", [])
    
    def getUserReports(username):
        reports_list = reportsColl.where("username", "==", username).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reports_list!=[]):
            res_list = []
            for doc in reports_list:
                report = doc.to_dict()
                report['reportID'] = doc.id 
                res_list.append(report)
            return ("Success", res_list)
        else:
            return ("User has no reports", [])


    def voteReport(username,reportID,upvote):
        if(ReportManager.validateReport(reportID)):
            voteUpdate = ReportManager.updateVote(username,reportID,upvote)
            print("voteUpdate = " ,voteUpdate)
            reportsColl.document(reportID).update({"votes": firestore.Increment(voteUpdate)})
            return "Success"
        else:
            return "Report does not exist"
    
    def updateVote(userID,reportID,upvote):
        query = reportsColl.document(reportID).collection('votes').document(userID).get()
        if query.exists == 0 :
            if upvote == None:
                return 0
            reportsColl.document(reportID).collection('votes').document(userID).set({"upvote": upvote})
            voteUpdate = boolDiff(upvote,None)
            return voteUpdate
        
        vote = query.to_dict().get("upvote")
        # vote variable is the before value of review vote, upvote is the updating value
        voteUpdate = boolDiff(upvote,vote)
        if upvote == None:
            reportsColl.document(reportID).collection('votes').document(userID).delete()
        else:
            reportsColl.document(reportID).collection('votes').document(userID).update({"upvote": upvote})
        
        return voteUpdate

    def deleteReportVotes(reportID):
        votesColl = reportsColl.document(reportID).collection('votes')
        delete_collection(votesColl,10)

    def getReportCount(stallID):
        avgRating,totalRating = 0,0
        reportLength = reportsColl.where("stallID", "==", stallID).count().get()
        return reportLength[0][0].value

    def addHawkerReport(centreID,reportID):
        hawkerCentreLocationsColl = db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayUnion([reportID])})
        return

    def deleteHawkerReport(centreID,reportID):
        hawkerCentreLocationsColl = db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayRemove([reportID])})
        return