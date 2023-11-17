from firebase_admin import firestore
from utils.functions import delete_collection,boolDiff
from firebase_admin.firestore import SERVER_TIMESTAMP

db = firestore.client()

reportsColl = db.collection('reports')

class ReportManager(object):
    """Manage reports related to hawker stalls.

    This class provides methods to create, update, delete, and retrieve reports about hawker stalls.
    Reports can be associated with a specific user, hawker stall, and hawker centre.

    Args:
        object (type): The base class for this object.

    Methods:
        createReport(username, stallID, centreID, category, description, image):
            Create a new report and associate it with a hawker stall.

        updateReport(reportID, category, description, image):
            Update the details of an existing report.

        deleteReport(reportID, centreID):
            Delete a report and remove its association with a hawker centre.

        validateReport(reportID):
            Check if a report with the specified ID exists.

        validateCreateReport(username, stallID):
            Check if a user has already reported a specific hawker stall.

        getStallReports(stallID):
            Retrieve a list of reports associated with a specific hawker stall.

        getUserReports(username):
            Retrieve a list of reports submitted by a specific user.

        getReport(reportID):
            Retrieve details of a specific report.

        voteReport(username, reportID, upvote):
            Vote on a report, either upvote or downvote.

        updateVote(userID, reportID, upvote):
            Update the vote on a report and return the vote change.

        deleteReportVotes(reportID):
            Delete all votes associated with a specific report.

        getReportCount(stallID):
            Get the count of reports associated with a specific hawker stall.

        addHawkerReport(centreID, reportID):
            Add a report to the list of reports associated with a hawker centre.

        deleteHawkerReport(centreID, reportID):
            Remove a report from the list of reports associated with a hawker centre.
    """
    def createReport(username,stallID,centreID,category,description,image):
        """Create a new report and associate it with a hawker stall.

        This method adds a new report entry to the Firestore database, associating it with
        the specified user, hawker stall, and hawker centre. The report includes details such as
        category, description, image, and is initialized with zero votes and a timestamp.

        Args:
            username (str): The username of the user creating the report.
            stallID (str): The unique identifier of the hawker stall being reported.
            centreID (str): The unique identifier of the hawker centre associated with the stall.
            category (str): The category of the report (e.g., cleanliness, quality).
            description (str): A detailed description of the reported issue.
            image (str): URL or path to an image related to the report.

        Returns:
            str: The unique identifier (ID) of the created report if successful.
                If the user has already reported the stall, returns 'user has already reported the stall'.
        """
        if(ReportManager.validateCreateReport(username,stallID)):
            _, report = reportsColl.add({"username": username, "stallID": stallID, "description": description
                                         ,"category": category,"image": image,  "votes": 0, "timestamp": SERVER_TIMESTAMP})
            ReportManager.addHawkerReport(centreID,report.id)
            return report.id
        else:   
            return "user has already reported the stall"

    def updateReport(reportID,category,description,image):
        """Update the details of an existing report.

        This method modifies the category, description, and image of an existing report
        identified by the provided report ID.

        Args:
            reportID (str): The unique identifier (ID) of the report to update.
            category (str): The updated category of the report (e.g., cleanliness, quality).
            description (str): The updated detailed description of the reported issue.
            image (str): The updated URL or path to an image related to the report.

        Returns:
            str: 'Success' if the report is successfully updated,
                'Report does not exist' if the specified report ID is not found.
        """
        if(ReportManager.validateReport(reportID)):
            reportsColl.document(reportID).update({"category": category,"description": description,"image": image})
            return "Success"
        else:
            return "Report does not exist"    

    def deleteReport(reportID,centreID):
        """Delete an existing report and its association with a hawker centre.

        This method removes an existing report identified by the provided report ID from the
        Firestore database. Additionally, it updates the list of reports associated with the
        specified hawker centre by removing the report ID.

        Args:
            reportID (str): The unique identifier (ID) of the report to delete.
            centreID (str): The unique identifier (ID) of the hawker centre associated with the report.

        Returns:
            str: 'Success' if the report is successfully deleted,
                'Report does not exist' if the specified report ID is not found.
        """
        if(ReportManager.validateReport(reportID)):
            reportsColl.document(reportID).delete()
            ReportManager.deleteHawkerReport(centreID,reportID)
            return "Success"
        else:
            return "Report does not exist"   
            

    def validateReport(reportID):
        """Check if a report with the specified ID exists in the Firestore database.

        This method verifies the existence of a report by querying the Firestore database
        using the provided report ID.

        Args:
            reportID (str): The unique identifier (ID) of the report to validate.

        Returns:
            bool: True if the report with the specified ID exists,
                False if the report with the specified ID does not exist.
        """
        report = reportsColl.document(reportID).get()
        if report.exists:
            return True
        else:
            return False

    def validateCreateReport(username, stallID):
        """Check if a user has already reported a stall with the specified ID.

        This method queries the Firestore database to determine if a report exists
        with the given stall ID and username, indicating that the user has already
        reported the stall.

        Args:
            username (str): The username of the user attempting to create the report.
            stallID (str): The unique identifier (ID) of the stall being reported.

        Returns:
            bool: True if the user has not reported the stall with the specified ID,
                False if the user has already reported the stall.
        """
        report = reportsColl.where("stallID","==",stallID).where("username","==",username).get()
        if len(report) == 0:
            return True
        else:
            return False
    
    def getStallReports(stallID):
        """Retrieve the reports for a stall with the specified ID.

        This method queries the Firestore database to retrieve the reports associated
        with the specified stall ID. The reports are ordered by timestamp in descending
        order.

        Args:
            stallID (str): The unique identifier (ID) of the stall for which to retrieve reports.

        Returns:
            tuple: A tuple containing a status message and a list of reports.
                - If reports are found, the status message is "Success" and the list
                    contains dictionaries representing each report, including the report ID.
                - If the stall has no reports, the status message is "Stall has no reports"
                    and an empty list is returned.
        """
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
        """Retrieve the reports submitted by a user with the specified username.

        This method queries the Firestore database to retrieve the reports submitted
        by the user with the specified username. The reports are ordered by timestamp
        in descending order.

        Args:
            username (str): The username of the user for whom to retrieve reports.

        Returns:
            tuple: A tuple containing a status message and a list of reports.
                - If reports are found, the status message is "Success" and the list
                    contains dictionaries representing each report, including the report ID.
                - If the user has no reports, the status message is "User has no reports"
                    and an empty list is returned.
        """
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
        
    def getReport(reportID):
        """Retrieve information about a specific report using its ID.

        This method queries the Firestore database to retrieve information about a
        specific report identified by the provided report ID.

        Args:
            reportID (str): The unique identifier of the report to retrieve.

        Returns:
            dict or str: A dictionary representing the report information, including
                        the report ID, if the report exists.
                        If the report does not exist, the return value is "No such report".
        """
        report = reportsColl.document(reportID).get()
        if report.exists:
            return (report.to_dict())
        else:
            return ("No such report")


    def voteReport(username,reportID,upvote):
        """Vote on a specific report.

        This method allows a user to vote on a specific report by providing their
        username, the report ID, and indicating whether it's an upvote or downvote.

        Args:
            username (str): The username of the user casting the vote.
            reportID (str): The unique identifier of the report to vote on.
            upvote (bool or None): If True, it's an upvote; if False, it's a downvote;
                                if None, it's a neutral vote.

        Returns:
            str: A string indicating the success or failure of the vote operation.
        """
        if(ReportManager.validateReport(reportID)):
            voteUpdate = ReportManager.updateVote(username,reportID,upvote)
            print("voteUpdate = " ,voteUpdate)
            reportsColl.document(reportID).update({"votes": firestore.Increment(voteUpdate)})
            return "Success"
        else:
            return "Report does not exist"
    
    def updateVote(userID,reportID,upvote):
        """Update the vote for a specific report by a user.

        This method updates the vote for a specific report by a user, where the
        user is identified by their user ID. It handles the addition, removal, or
        modification of a user's vote.

        Args:
            userID (str): The unique identifier of the user casting the vote.
            reportID (str): The unique identifier of the report to update the vote for.
            upvote (bool or None): If True, it's an upvote; if False, it's a downvote;
                                if None, it's a neutral vote.

        Returns:
            int: The value by which to increment or decrement the report's vote count.
                It will be 1 for an upvote, -1 for a downvote, and 0 for a neutral vote.
        """
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
        """Delete all votes associated with a specific report.

        This method deletes all the votes associated with a specific report. Each
        vote is stored in a subcollection named 'votes' under the specified report.

        Args:
            reportID (str): The unique identifier of the report for which to delete votes.
        """
        votesColl = reportsColl.document(reportID).collection('votes')
        delete_collection(votesColl,10)

    def getReportCount(stallID):
        """Get the count of reports for a specific stall.

        This method retrieves the count of reports associated with a specific stall
        identified by the provided `stallID`.

        Args:
            stallID (str): The unique identifier of the stall for which to retrieve the report count.

        Returns:
            int: The count of reports for the specified stall.
        """
        reportLength = reportsColl.where("stallID", "==", stallID).get()
        return len(reportLength) 

    def addHawkerReport(centreID,reportID):
        """Add a report to the list of reports associated with a hawker centre.

        This method adds the provided `reportID` to the list of reports associated with the
        hawker centre identified by the provided `centreID`.

        Args:
            centreID (str): The unique identifier of the hawker centre to which the report belongs.
            reportID (str): The unique identifier of the report to be added.
        """
        db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayUnion([reportID])})
        return

    def deleteHawkerReport(centreID,reportID):
        """Remove a report from the list of reports associated with a hawker centre.

        This method removes the provided `reportID` from the list of reports associated with the
        hawker centre identified by the provided `centreID`.

        Args:
            centreID (str): The unique identifier of the hawker centre from which the report should be removed.
            reportID (str): The unique identifier of the report to be removed.
        """
        db.collection('hawkercentres').document(centreID).update({"reports": firestore.ArrayRemove([reportID])})
        return