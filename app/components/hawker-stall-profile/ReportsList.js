import React from 'react';
import { StyleSheet, View } from 'react-native';
import Report from './Report';

const ReportsList = ({ reports, image, type, stallID }) => {
    // Map the array of reports to Report components


    const reportsList = reports.map((report, index) => (
        <Report
          key={index}
          image={image} // You may want to replace this with the actual image source
          username={report.username}
          profilePic={require('../../assets/avatar.png')}
          upvote={report.votes}
          downvote={0}
          description={report.description}
          date={report.timestamp}
          stallID={stallID}
          type={type} // Make sure 'type' is defined in your code
        />
      ));
  
    return (<View style={styles.default}>
                <View style={styles.container}>
                    {reportsList}
                </View>
            </View>);
};

export default ReportsList;

const styles = StyleSheet.create({
    default: {
        width: 'auto',
        height: '100%',
        
    },
    container: {
        flex: 1,
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
});