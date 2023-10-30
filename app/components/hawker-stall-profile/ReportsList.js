import React from 'react';
import { StyleSheet, View } from 'react-native';
import Report from './Report';

const ReportsList = ({ reports, type }) => {
    // Map the array of reports to Report components
    const reportsList = reports.map((reportObj, index) => (
      <Report
        key={index}
        image={reportObj.image}
        username={reportObj.username}
        profilePic={reportObj.profilePic}
        upvote={reportObj.upvote}
        downvote={reportObj.downvote}
        description={reportObj.description}
        date={reportObj.date}
        type={type}
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
});