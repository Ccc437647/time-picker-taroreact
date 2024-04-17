import { useState, useEffect } from 'react'
import { Block, View, PickerView, PickerViewColumn, Text } from '@tarojs/components'
import dateUtil from '../../utils/dateutils.js'
import './date-picker.scss'

let resultValue;
let beforeYear;
let beforeMonth;
export default function DatePicker(props: any) {
  const { data, date, mode, isShowDatePicker } = props;
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [hours, setHours] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);
  const [value, setValue] = useState<any>(null)
  const [isShowYear, setIsShowYear] = useState(false)
  const [isShowMonth, setIsShowMonth] = useState(false)
  const [isShowDay, setIsShowDay] = useState(false)
  const [isShowHour, setIsShowHour] = useState(false)
  const [isShoMinutes, setIsShoMinutes] = useState(false)
  const [isShowSeconds, setIsShowSeconds] = useState(false)
  useEffect(() => {
    const years: number[] = [];
    const months: number[] = [];
    const days: number[] = [];
    const hours: number[] = [];
    const minutes: number[] = [];
    const seconds: number[] = [];

    for (let i = 1970; i <= 2100; i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    for (let i = 0; i < 60; i++) {
      seconds.push(i);
    }
    setYears(years);
    setMonths(months);
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, []);


  const setDayss = (year, month) => {
    if (year != beforeYear || beforeMonth != month) {
      beforeYear = year;
      beforeMonth = month;
      let dayCount = dateUtil.getDaysOfMonth(year, month)
      let days: number[] = []
      for (let i = 1; i <= dayCount; i++) {
        days.push(i)
      }
      setDays(days)
    }
  }
  const setColumns = () => {
    setIsShowYear(mode == 'YMDhms' || mode == 'YMDhm' || mode == 'YMD')
    setIsShowMonth(mode == 'YMDhms' || mode == 'YMDhm' || mode == 'YMD' || mode == 'MD')
    setIsShowDay(mode == 'YMDhms' || mode == 'YMDhm' || mode == 'YMD' || mode == 'MD')
    setIsShowHour(mode == 'YMDhms' || mode == 'YMDhm' || mode == 'hm')
    setIsShoMinutes(mode == 'YMDhms' || mode == 'YMDhm' || mode == 'hm')
    setIsShowSeconds(mode == 'YMDhms')
  }
  const setDateByMode = () => {

    let year = dateUtil.getYear(date)
    let month = dateUtil.getMonth(date)
    setDayss(year, month)
    let days = dateUtil.getDay(date)
    let hours = dateUtil.getHour(date)
    let minutes = dateUtil.getMinute(date)
    let seconds = dateUtil.getSecond(date)
    beforeYear = year;
    beforeMonth = month;
    const q = [year - 1970, month - 1, days - 1, hours, minutes, seconds]
    setValue(q)
    resultValue = q
    setColumns()
  }

  useEffect(() => {
    setDateByMode()
  }, [isShowDatePicker])

  const onChange = (e) => {
    const val = e.detail.value
    resultValue = val
    let year = years[val[0]]
    let month = months[val[1]]
    setDayss(year, month)
  }
  const onCancellClick = () => {
    props.datePickerCancellEvent()
  }
  const onOkClick = () => {
    const myEventDetail = {
      data: data,
      date: getResultDate()
    }
    props.datePickerOkEvent(myEventDetail)
  }

  const getResultDate = () => {
    let result = 0
    let year = years?.[resultValue?.[0]]
    let month = months?.[resultValue?.[1]] - 1
    let day = days?.[resultValue?.[2]]
    let hour = hours?.[resultValue?.[3]]
    let minute = minutes?.[resultValue?.[4]]
    let second = seconds?.[resultValue?.[5]]
    if (mode == 'YMDhms') {
      result = new Date(year, month, day, hour, minute, second).getTime()
    } else {
      result = new Date(year, month, day, hour, minute).getTime()
    }
    return result
  }

  return (
    <Block>
      <View className="mask" style={{ display: isShowDatePicker ? 'block' : 'none' }} onClick={onCancellClick}></View>

      <View className={'content ' + (isShowDatePicker ? 'view-show' : 'view-hidde')}>
        <View className="datepicker">
          <View className="ok-c">
            <View onClick={onCancellClick} className="cancell">取消</View>
            <View onClick={onOkClick} className="ok">确定</View>
          </View>
          <View className="divider"></View>
          {value && <PickerView
            indicatorStyle="height: 2.5rem;"
            style={{
              width: '100%',
              height: '12.5rem',
              backgroundColor: 'white',
              fontSize: '0.75rem',
            }}
            defaultValue={value}
            onChange={onChange}
          >
            {!!isShowYear && (
              <PickerViewColumn>
                {years?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item">
                      <Text>{item + '年'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
            {!!isShowMonth && (
              <PickerViewColumn>
                {months?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item"
                      style={{
                        lineHeight: '2.5rem',
                      }}
                    >
                      <Text>{item + '月'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
            {!!isShowDay && (
              <PickerViewColumn>
                {days?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item"
                      style={{
                        lineHeight: '2.5rem',
                      }}
                    >
                      <Text>{item + '日'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
            {!!isShowHour && (
              <PickerViewColumn>
                {hours?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item"
                      style={{
                        lineHeight: '2.5rem',
                      }}
                    >
                      <Text>{item + '时'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
            {!!isShoMinutes && (
              <PickerViewColumn>
                {minutes?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item"
                      style={{
                        lineHeight: '2.5rem',
                      }}
                    >
                      <Text>{item + '分'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
            {!!isShowSeconds && (
              <PickerViewColumn>
                {seconds?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="item"
                      style={{
                        lineHeight: '2.5rem',
                      }}
                    >
                      <Text>{item + '秒'}</Text>
                    </View>
                  )
                })}
              </PickerViewColumn>
            )}
          </PickerView>}
        </View>
      </View>
    </Block>
  )
}


