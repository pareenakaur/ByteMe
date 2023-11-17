import datetime
from firebase_admin import firestore
import googlemaps
import googlemaps

db = firestore.client()

usersColl = db.collection('users')

gmaps = googlemaps.Client(key=db.collection('admin').document('google_api_key').get().to_dict()['key'])

class AccountManager(object):
    """Manage user accounts and authentication.

    This class provides methods for user registration, login, password reset,
    and management of favorite stalls.

    Args:
        object: The base class for the AccountManager.

    Attributes:
        None

    Methods:
        validateUsername(username):
            Check if a username is unique.

        registerUser(username, password, email):
            Register a new user with the provided username, password, and email.

        validateLogin(username, password):
            Validate user credentials during login.

        getUser(username):
            Retrieve user information based on the username.

        addFavouriteStall(username, stallID):
            Add a stall to the user's list of favorite stalls.

        removeFavouriteStall(username, stallID):
            Remove a stall from the user's list of favorite stalls.

        getFavouriteStalls(userID, format):
            Retrieve information about the user's favorite stalls.

        resetPassword(username, password):
            Reset the user's password.
    """
    
    def validateUsername(username):
        """Check if a username is unique.

        This method queries the Firestore database to determine if the provided
        username is unique and not already in use.

        Args:
            username (str): The username to be validated.

        Returns:
            bool: True if the username is unique, False if the username is already in use.
        """

        user_dict = usersColl.document(username).get().to_dict()
        if (user_dict == None): # Username must be unique, password and email need not be unique
            return True
        else:
            return False

    def registerUser(username,password,email):
        """Register a new user with the provided username, password, and email.

        This method checks if the given username is unique using the `validateUsername` method,
        and if so, it creates a new user document in the Firestore database with the provided
        information.

        Args:
            username (str): The desired username for registration.
            password (str): The user's chosen password.
            email (str): The user's email address.

        Returns:
            str: 'Success' if the registration is successful, 'username Taken' if the
                username is already in use.
        """
        if(AccountManager.validateUsername(username)):
            createdDate = datetime.datetime.now()
            usersColl.document(username).set({"username": username, "password": password, "email": email, "createdDate": createdDate,\
                                              "favourites": []})
            return "Success"
        else:
            return "username Taken"
    
    def validateLogin(username,password):
        """Validate user credentials during login.

        This method checks the provided username and password against the user records
        in the Firestore database to determine the login status.

        Args:
            username (str): The username for login validation.
            password (str): The password for login validation.

        Returns:
            str: 'Success' if the login is successful, 'Invalid username' if the username
                does not exist, and 'Wrong password' if the password is incorrect.
        """
        user_dict = usersColl.document(username).get().to_dict()
        if(user_dict == None):
            return "Invalid username"
        elif(password == user_dict["password"]):
            return "Success"
        else:
            return "Wrong password"

    def getUser(username):
        """Retrieve user information based on the username.

        This method queries the Firestore database for user information based on the provided username.

        Args:
            username (str): The username for which to retrieve user information.

        Returns:
            tuple: A tuple containing two elements:
                - The first element is a status message, either 'Success' if the user information is
                successfully retrieved, or 'Username does not exist' if the username is not found.
                - The second element is a dictionary containing the user information if the status is 'Success',
                or an empty dictionary if the status is 'Username does not exist'.
        """
        if (not AccountManager.validateUsername(username)):
            user_dict = usersColl.document(username).get().to_dict()
            return ("Success", user_dict)
        else:
            return ("Username does not exist",{})
    
    def addFavouriteStall(username, stallID):
        """Add a stall to the user's list of favorite stalls.

        This method updates the user document in the Firestore database by adding the specified
        stallID to the user's list of favorite stalls.

        Args:
            username (str): The username of the user adding the stall to favorites.
            stallID (str): The unique identifier of the stall to be added to favorites.

        Returns:
            str: 'Success' if the stall is successfully added to favorites,
                'Username does not exist' if the provided username is not found.
        """
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"favourites": firestore.ArrayUnion([stallID])})
            return "Success"
        else:
            return "Username does not exist"
        
    def removeFavouriteStall(username, stallID):
        """Remove a stall from the user's list of favorite stalls.

        This method updates the user document in the Firestore database by removing the specified
        stallID from the user's list of favorite stalls.

        Args:
            username (str): The username of the user removing the stall from favorites.
            stallID (str): The unique identifier of the stall to be removed from favorites.

        Returns:
            str: 'Success' if the stall is successfully removed from favorites,
                'stallID not in favourites list' if the provided stallID is not in the user's favorites,
                'Username does not exist' if the provided username is not found.
        """
        if(not AccountManager.validateUsername(username)):
            user_dict = usersColl.document(username).get().to_dict()
            if(stallID in user_dict["favourites"]):
                usersColl.document(username).update({"favourites": firestore.ArrayRemove([stallID])})
                return "Success"
            else:
                return "stallID not in favourites list"
        else:
            return "Username does not exist"
        
    def getFavouriteStalls( userID, format):
        """Retrieve information about the user's favorite stalls.

        This method queries the Firestore database to obtain the list of stall IDs marked
        as favorites by the specified user and retrieves detailed information about each
        favorite stall using the `HawkerManager` class.

        Args:
            userID (str): The unique identifier of the user for whom to retrieve favorite stalls.
            format (str): The desired format for the retrieved information (e.g., 'json', 'xml').

        Returns:
            list: A list of dictionaries containing information about each favorite stall.
                Each dictionary represents a stall and includes stall details such as name, location, etc.
        """
        from classes.HawkerManager import HawkerManager

        hawker_manager = HawkerManager(db,gmaps)

        user_dict = usersColl.document(userID).get().to_dict()
        favourite_ids = user_dict['favourites']

        favourite_stalls = []
        for id in favourite_ids:
            favourite_stalls.append(hawker_manager.getStallInfo(id, format))
        return favourite_stalls
    
    def resetPassword(username, password):
        """Reset the password for the specified user.

        This method updates the password of the specified user in the Firestore database.

        Args:
            username (str): The username of the user for whom to reset the password.
            password (str): The new password to set for the user.

        Returns:
            str: 'Success' if the password is successfully reset,
                'Username does not exist' if the provided username is not found.
        """
        if(not AccountManager.validateUsername(username)):
            usersColl.document(username).update({"password": password})
            return "Success"
        else:
            return "Username does not exist"

