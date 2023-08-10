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
  listServicesCustomerScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  listServicesScreen: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  transactionScreen: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 50,
  },
  listAppointScreen: {
    flex: 1,
    paddingHorizontal: 8,
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
    padding: 10,
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
    backgroundColor: 'white',
    borderRadius: 8,
  },
  statusBookingFocus: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
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
    width: '100%',
  },
  boxDiscount: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: 'white',
  },
  btnNotClick: {
    borderColor: '#238793',
    borderWidth: 1,
    borderRadius: 10,
    width: '48%',
    backgroundColor: 'white',
  },
  btnClick: {
    backgroundColor: '#238793',
    borderColor: 'white',
    borderWidth: 1,
    width: '48%',
  },
});
