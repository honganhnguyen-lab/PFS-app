import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  addNewText: {
    textAlign: 'center',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dashboardContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listServicesScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  transactionScreen: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  listAppointScreen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  detailScreen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    position: 'relative',
  },
  infoArea: {
    marginTop: 100,
  },
  textInfo: {
    paddingLeft: 10,
  },
  badge: {
    width: 100,
    textTransform: 'uppercase',
  },
  searchBox: {
    backgroundColor: '#559FA7',
  },
  filterIcon: {
    backgroundColor: 'white',
    borderBottom: '1px solid #DDDDEE',
  },
  buttonText: {
    color: '#95C4CB',
    fontWeight: 600,
  },
  buttonTextFocus: {
    color: 'white',
    fontWeight: 600,
  },
  statusBooking: {
    backgroundColor: '#95C4CB',
  },
  statusBookingFocus: {
    backgroundColor: 'white',
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  boxDetailContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    marginLeft: 20,
    marginRight: 20,
  },
  boxDiscount: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
