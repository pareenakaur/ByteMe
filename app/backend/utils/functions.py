import math

# Calculate difference of bools, true = 1,none = 0, false = -1
def boolDiff(value1, value2):
    # Convert boolean values to the specified mapping
        value1_mapped = 1 if value1 is True else (-1 if value1 is False else 0)
        value2_mapped = 1 if value2 is True else (-1 if value2 is False else 0)
        
        # Calculate the difference
        difference = value1_mapped - value2_mapped
        
        return difference

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance (in meters) between two points
    on the Earth's surface specified in latitude and longitude.
    """
    # Radius of the Earth in meters
    R = 6371000  # Approximately 6,371 kilometers

    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance
