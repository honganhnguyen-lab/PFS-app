import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';

export const DatePickerCustomize = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const minDay = moment().add(1, 'days').format('YYYY/MM/DD').toString();
  const onChangeSelectedDate = date => {
    setSelectedDate(date);
    console.log('date', date);
  };

  useEffect(() => {}, []);

  return (
    <DatePicker
      mode="datepicker"
      onSelectedChange={onChangeSelectedDate}
      minimumDate={`${minDay} 10:30`}
      minuteInterval={10}
      options={{
        textHeaderColor: '#569FA7',
        selectedTextColor: '#fff',
        mainColor: '#569FA7',
        textSecondaryColor: '#569FA7',
        borderColor: '#569FA7',
      }}
    />
  );
};
