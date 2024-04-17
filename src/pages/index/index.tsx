import { View, Text } from '@tarojs/components'
import './index.scss'
import { useState } from 'react'
import DatePicker from '../date-picker/date-picker'
const dateUtils = require('../../utils/dateutils.js')
export default function Index() {
  const [data, setData] = useState({
    isShowPicker: false,
    mode: 'YMDhms',
    data: {},
    date: new Date().getTime(),
    yMDhms: '',
    yMDhm: '',
  })
  const [isShowPicker, setisShowPicker] = useState(false)
  const datePickerCancellEvent = () => {
    setisShowPicker(false)
  }
  const datePickerOkEvent = (e) => {
    setisShowPicker(false)
    switch (e?.data?.mode) {
      case 'YMDhms': {
        setData({ ...data, yMDhms: dateUtils.formatLongTime(e.date, 'Y-M-D h:m:s') })
        break
      }
      case 'YMDhm': {
        setData({ ...data, yMDhm: dateUtils.formatLongTime(e.date, 'Y-M-D h:m') })
        break
      }
    }

  }

  const onYMDhms = () => {
    setisShowPicker(true)
    setData({
      ...data,
      mode: 'YMDhms',
      data: {
        type: 'YMDhms',
      },
    })
  }

  const onYMDhm = () => {
    setisShowPicker(true)
    setData({
      ...data,
      mode: 'YMDhm',
      data: {
        type: 'YMDhm',
      },
    })
  }



  return (
    <View className='index'>

      <View className="form-list-item" onClick={onYMDhms}>
        <View className="form-item-name">模式(YMDhms)</View>
        <Text className="form-item-content color-desc">{data.yMDhms}</Text>
      </View>

      <View className="form-list-item" onClick={onYMDhm}>
        <View className="form-item-name">模式(YMDhm)</View>
        <Text className="form-item-content color-desc">{data.yMDhm}</Text>
      </View>


      <DatePicker
        datePickerCancellEvent={datePickerCancellEvent}
        datePickerOkEvent={datePickerOkEvent}
        isShowDatePicker={isShowPicker}
        mode={data.mode}
        data={data}
        date={data.date}
      ></DatePicker>
    </View>
  )
}
