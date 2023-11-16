from firebase_admin import firestore
from utils.functions import delete_collection,boolDiff
from firebase_admin.firestore import SERVER_TIMESTAMP

db = firestore.client()

reviewsColl = db.collection('reviews')

class ReviewManager(object):
    """Manage reviews for hawker stalls.

    This class provides methods to create, update, and delete reviews for hawker stalls. It also
    includes functionalities to retrieve reviews, calculate average ratings, and manage votes on reviews.

    Args:
        object (_type_): _description_

    Methods:
        createReview(username, stallID, centreID, rating, description, image): 
            Create a new review for a hawker stall.

        updateReview(reviewID, rating, description, image): 
            Update an existing review.

        deleteReview(reviewID, centreID): 
            Delete a review for a hawker stall.

        validateReview(reviewID): 
            Check if a review exists based on its unique identifier.

        validateCreateReview(username, stallID): 
            Check if a user can create a review for a stall based on a unique username-stallID pair.

        getStallReviews(stallID): 
            Retrieve all reviews for a hawker stall.

        getUserReviews(username):
            Retrieve all reviews submitted by a user.

        getReview(reviewID): 
            Retrieve the details of a specific review.

        getAvgReviewRating(stallID): 
            Calculate the average rating for a hawker stall.

        getReviewCount(stallID): 
            Get the total number of reviews for a hawker stall.
        
        voteReview(username, reviewID, upvote): 
            Vote on a review, either upvote or downvote.
        
        updateVote(userID, reviewID, upvote): 
            Update a user's vote on a review.
        
        deleteReviewVotes(reviewID): 
            Delete all votes associated with a review.
        
        addHawkerReview(centreID, reviewID): 
            Add a review to the list of reviews associated with a hawker centre.
        
        deleteHawkerReview(centreID, reviewID): 
            Remove a review from the list of reviews associated with a hawker centre.
    """

    def createReview(username,stallID,centreID,rating,description,image):
        """Create a new review for a hawker stall.

        This method adds a new review to the Firestore database for the specified hawker stall.
        It includes details such as the username of the reviewer, the unique identifiers of the stall
        and hawker centre, the rating given, a textual description, and an optional image.

        Args:
            username (str): The username of the reviewer.
            stallID (str): The unique identifier of the hawker stall being reviewed.
            centreID (str): The unique identifier of the hawker centre to which the stall belongs.
            rating (float): The rating given by the reviewer (e.g., 4.5).
            description (str): A textual description or comment provided by the reviewer.
            image (str): An optional image URL or reference associated with the review.

        Returns:
            str: The unique identifier (ID) of the created review.

        Note:
            The method first checks if the user can create a review for the specified stall based on a
            unique combination of the username and stallID. If the user has already reviewed the stall,
            the method returns a message indicating that the user has already submitted a review.
        """
        if(ReviewManager.validateCreateReview(username,stallID)):
            _, review = reviewsColl.add({"username": username, "stallID": stallID, "rating": rating,"description": description,"image": image,
                                         "votes": 0, "timestamp": SERVER_TIMESTAMP})
            ReviewManager.addHawkerReview(centreID,review.id)
            return review.id
        else:
            return "user has already reviewed the stall"

    def updateReview(reviewID,rating,description,image):
        """Update an existing review.

        This method modifies the attributes of an existing review in the Firestore database.
        It allows updating the rating, textual description, and an optional image associated with the review.

        Args:
            reviewID (str): The unique identifier of the review to be updated.
            rating (float): The new rating to be assigned to the review (e.g., 4.0).
            description (str): The updated textual description or comment for the review.
            image (str): The updated image URL or reference associated with the review.

        Returns:
            str: A message indicating the success of the update operation.

        Note:
            The method checks if the specified reviewID exists in the database. If the review exists,
            the attributes (rating, description, and image) are updated. If the review does not exist,
            the method returns a message indicating that the review does not exist.
        """

        if(ReviewManager.validateReview(reviewID)):
            reviewsColl.document(reviewID).update({"rating":rating,"description":description,"image": image}) 
            return "Success"
        else:
            return "Review does not exist"    

    def deleteReview(reviewID,centreID):
        """Delete a review and remove its association with a hawker centre.

        This method deletes a review with the specified reviewID from the Firestore database.
        Additionally, it removes the association of the review with the specified hawker centre (centreID).

        Args:
            reviewID (str): The unique identifier of the review to be deleted.
            centreID (str): The unique identifier of the hawker centre associated with the review.

        Returns:
            str: A message indicating the success of the deletion operation.

        Note:
            The method checks if the specified reviewID exists in the database. If the review exists,
            it is deleted, and its association with the hawker centre is removed. If the review does not exist,
            the method returns a message indicating that the review does not exist.
        """

        if(ReviewManager.validateReview(reviewID)):
            reviewsColl.document(reviewID).delete()
            ReviewManager.deleteHawkerReview(centreID,reviewID)
            return "Success"
        else:
            return "Review does not exist"
            

    def validateReview(reviewID):
        """Check if a review with the specified ID exists in the database.

        This method queries the Firestore database to check the existence of a review
        with the specified reviewID.

        Args:
            reviewID (str): The unique identifier of the review to be validated.

        Returns:
            bool: True if the review with the given ID exists; False otherwise.
        """

        review = reviewsColl.document(reviewID).get()
        if review.exists:
            return True
        else:
            return False

    def validateCreateReview(username, stallID):
        """Check if a review with the specified ID exists in the database.

        This method queries the Firestore database to check the existence of a review
        with the specified reviewID.

        Args:
            reviewID (str): The unique identifier of the review to be validated.

        Returns:
            bool: True if the review with the given ID exists; False otherwise.
        """

        review = reviewsColl.where("stallID","==",stallID).where("username","==",username).get()
        if len(review) == 0:
            return True
        else:
            return False

    def getStallReviews(stallID):
        """Retrieve reviews for a specific stall.

        This method queries the Firestore database to retrieve reviews for the specified stallID.
        The reviews are ordered by timestamp in descending order, meaning the most recent reviews
        appear first in the result.

        Args:
            stallID (str): The unique identifier of the stall for which reviews are to be retrieved.

        Returns:
            tuple: A tuple containing a status message and a list of reviews. If reviews are found,
                the status message is "Success" along with a list of reviews. If no reviews are found,
                the status message is "Stall has no reviews" along with an empty list.
        """

        reviews_list = reviewsColl.where("stallID","==",stallID).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                review = doc.to_dict()
                review['reviewID'] = doc.id 
                res_list.append(review)
            return ("Success", res_list)
        else:
            return ("Stall has no reviews", [])
    
    def getUserReviews(username):
        """Retrieve reviews submitted by a specific user.

        This method queries the Firestore database to retrieve reviews submitted by the specified username.
        The reviews are ordered by timestamp in descending order, meaning the most recent reviews submitted
        by the user appear first in the result.

        Args:
            username (str): The username of the user for whom reviews are to be retrieved.

        Returns:
            tuple: A tuple containing a status message and a list of reviews. If reviews are found,
                the status message is "Success" along with a list of reviews. If the user has not submitted
                any reviews, the status message is "User has no reviews" along with an empty list.
        """
        
        reviews_list = reviewsColl.where("username", "==", username).order_by(
            "timestamp", direction=firestore.Query.DESCENDING
        ).get()
        if(reviews_list!=[]):
            res_list = []
            for doc in reviews_list:
                review = doc.to_dict()
                review['reviewID'] = doc.id 
                res_list.append(review)
            return ("Success", res_list)
        else:
            return ("User has no reviews", [])

    def getReview(reviewID):
        """Retrieve information about a specific review.

        This method queries the Firestore database to retrieve details about the review with the given review ID.

        Args:
            reviewID (str): The unique identifier of the review.

        Returns:
            dict or str: If the review exists, a dictionary containing the review details is returned.
                        If the review does not exist, the return value is the string "No such review."
        """

        review = reviewsColl.document(reviewID).get()
        if review.exists:
            return (review.to_dict())
        else:
            return ("No such review")
        
    def getAvgReviewRating(stallID):
        """Calculate the average review rating for a specific stall.

        This method calculates the average review rating for a given stall by summing up the ratings
        from all reviews associated with the stall and dividing by the total number of reviews.

        Args:
            stallID (str): The unique identifier of the stall.

        Returns:
            float or str: If there are reviews for the stall, the average rating (float) is returned.
                        If there are no reviews for the stall, the return value is the string "User has no reviews."
        """

        avgRating,totalRating = 0,0
        reviews_list = reviewsColl.where("stallID", "==", stallID).get()
        if(len(reviews_list) != 0):
            for doc in reviews_list:
                review = doc.to_dict()
                totalRating += review.get('rating')
            avgRating = totalRating / len(reviews_list)
            return avgRating
        else:
            return ("User has no reviews")
    
    def getReviewCount(stallID):
        """Get the total count of reviews for a specific stall.

        This method retrieves the total count of reviews associated with a given stall.

        Args:
            stallID (str): The unique identifier of the stall.

        Returns:
            int: The total count of reviews for the specified stall.
        """
        
        reviewLength = reviewsColl.where("stallID", "==", stallID).get()
        return len(reviewLength) 

    def voteReview(username,reviewID,upvote):
        """Vote on a review.

        This method allows a user to vote on a specific review, either upvoting or downvoting it.
        The vote is recorded and the review's vote count is updated accordingly.

        Args:
            username (str): The username of the user casting the vote.
            reviewID (str): The unique identifier of the review to be voted on.
            upvote (bool): A boolean indicating whether the vote is an upvote (True) or downvote (False).

        Returns:
            str: A message indicating the success or failure of the voting operation.
        """

        if(ReviewManager.validateReview(reviewID)):
            voteUpdate = ReviewManager.updateVote(username,reviewID,upvote)
            print("voteUpdate = " ,voteUpdate)
            reviewsColl.document(reviewID).update({"votes": firestore.Increment(voteUpdate)})
            return "Success"
        else:
            return "Review does not exist"
    
    def updateVote(userID,reviewID,upvote):
        """Update the vote of a user on a specific review.

        This method allows a user to update their vote on a particular review.
        It handles both setting a new vote and removing the vote if the user decides to undo their vote.

        Args:
            userID (str): The unique identifier of the user updating their vote.
            reviewID (str): The unique identifier of the review for which the vote is being updated.
            upvote (bool): A boolean indicating the new vote, or None to remove the existing vote.

        Returns:
            int: An integer representing the change in votes (0 for no change, 1 for upvote, -1 for downvote).
        """

        query = reviewsColl.document(reviewID).collection('votes').document(userID).get()
        if query.exists == 0 :
            if upvote == None:
                return 0
            reviewsColl.document(reviewID).collection('votes').document(userID).set({"upvote": upvote})
            voteUpdate = boolDiff(upvote,None)
            return voteUpdate
        
        vote = query.to_dict().get("upvote")
        # vote variable is the before value of review vote, upvote is the updating value
        voteUpdate = boolDiff(upvote,vote)
        if upvote == None:
            reviewsColl.document(reviewID).collection('votes').document(userID).delete()
        else:
            reviewsColl.document(reviewID).collection('votes').document(userID).update({"upvote": upvote})
        
        return voteUpdate

    def deleteReviewVotes(reviewID):
        """Delete votes associated with a specific review.

        This method removes all votes stored in the 'votes' collection for a given review.
        It is typically used when deleting the review itself to clean up associated vote data.

        Args:
            reviewID (str): The unique identifier of the review for which votes should be deleted.
        """
        votesColl = reviewsColl.document(reviewID).collection('votes')
        delete_collection(votesColl,10)
    
    def addHawkerReview(centreID,reviewID):
        """Add a review to the list of reviews associated with a hawker centre.

        This method updates the 'hawkercentres' collection in the database, adding the given
        reviewID to the 'reviews' field of the hawker centre with the specified centreID.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reviewID (str): The unique identifier of the review to be added.
        """
        db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayUnion([reviewID])})
        return

    def deleteHawkerReview(centreID,reviewID):
        """Remove a review from the list of reviews associated with a hawker centre.

        This method updates the 'hawkercentres' collection in the database, removing the given
        reviewID from the 'reviews' field of the hawker centre with the specified centreID.

        Args:
            centreID (str): The unique identifier of the hawker centre.
            reviewID (str): The unique identifier of the review to be removed.
        """
        
        db.collection('hawkercentres').document(centreID).update({"reviews": firestore.ArrayRemove([reviewID])})
        return
