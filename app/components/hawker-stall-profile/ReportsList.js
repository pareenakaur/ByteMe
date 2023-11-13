import React from 'react';
import { StyleSheet, View } from 'react-native';
import Report from './Report';

const ReportsList = ({ reports, hawkerStall, type }) => {
    // Map the array of reports to Report components


    const reportsList = reports.map((report, index) => (
        <Report
          key={index}
          image={hawkerStall.image} // You may want to replace this with the actual image source
          username={report.username}
          profilePic={require('../../assets/avatar.png')}
          upvote={report.votes}
          downvote={0}
          description={report.description}
          date={report.timestamp}
          type={type} // Make sure 'type' is defined in your code
        />
      ));
    // for (const key in reports) {
    // if (reports.hasOwnProperty(key)) {
    //     const report = reports[key]; // Access the nested object

    //     // Now, you can access properties of the nested object and create your Report component
    //     reportsList.push(
    //     <Report
    //         key={key} // You can use the key as a unique identifier
    //         image={hawkerStall.image} // Assuming hawkerStall is a property of the nested object
    //         username={report.username}
    //         profilePic={'app/assets/avatar.png'}
    //         upvote={report.votes}
    //         downvote={0}
    //         description={report.description}
    //         date={"7 Sept 2023, 11:00 am"}
    //         type={type}
    //     />
    //     );
    // }
    // }

    
    // const reportsList = reports.map((reportObj, index) => {
    //     // Access the inner object of objects within the array
    //     const report = reportObj[index]; // Modify the property name as needed
      
    //     return (
    //       <Report
    //         key={index}
    //         image={hawkerStall.image}
    //         username={report.username}
    //         profilePic={'app/assets/avatar.png'}
    //         upvote={report.votes}
    //         downvote={0}
    //         description={report.description}
    //         date={"7 Sept 2023, 11:00 am"}
    //         type={type}
    //       />
    //     );
    //   });
  
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
});